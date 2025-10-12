# Artifact A114: AI Ascent - Dual Domain Hosting Guide
# Date Created: C117
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A guide explaining how to host multiple domains (e.g., `aiascent.game` and `aiascent.dev`) on a single server using a reverse proxy like Caddy.
- **Tags:** guide, networking, hosting, reverse proxy, caddy, dns

## 1. Overview & Goal

You have asked if it's possible to host both `aiascent.game` and the new `aiascent.dev` on the same server that is currently hosting the game and the vLLM instance. The answer is **yes**, and this is a standard and efficient way to manage multiple websites on a single machine.

The goal of this guide is to explain the technical concept of a **reverse proxy** and provide a concrete example of how to configure it using Caddy, which you are already using.

## 2. The Core Concept: Reverse Proxy with Virtual Hosts

The magic that makes this work is a **reverse proxy** that uses **virtual hosts**. Here's how the pieces fit together:

1.  **DNS Records:** You will configure the DNS "A" records for both `aiascent.game` and `aiascent.dev` to point to the **same public IP address**—the one for your home server.

2.  **Port Forwarding:** Your AT&T router will continue to forward all web traffic (ports 80 for HTTP and 443 for HTTPS) to the single PC in your closet that acts as the server.

3.  **The Reverse Proxy (Caddy):** This is the traffic controller. Caddy will be the only process listening on ports 80 and 443. When a request comes in, Caddy inspects the `Host` header to see which domain the user was trying to reach.
    *   If the `Host` is `aiascent.game`, Caddy forwards the request to the Node.js process running your game.
    *   If the `Host` is `aiascent.dev`, Caddy forwards the request to the *different* Node.js process running your new website.

4.  **Backend Applications:** Each of your applications (the game server, the new website server) will run on its own, separate, internal-only port (e.g., 3001 for the game, 3002 for the new website). They don't need to know anything about HTTPS or the public domains.

This architecture is secure, efficient, and makes adding more websites in the future very simple.

## 3. Example Caddyfile Configuration

Your existing `Caddyfile` (from `A91`) is already set up to handle `aiascent.game`. To add the new `aiascent.dev` site, you simply need to add another block to the file.

Let's assume:
*   Your `aiascent.game` Node.js server runs on `localhost:3001`.
*   Your new `aiascent-dev` Next.js server will run on `localhost:3002`.

Your new `Caddyfile` would look like this:

```caddy
# Caddyfile for dual domain hosting

aiascent.game {
    # Caddy will automatically handle HTTPS for this domain.
    encode zstd gzip
    log {
        output file /var/log/caddy/aiascent_game.log
    }

    # Reverse proxy all requests for aiascent.game to the game server on port 3001.
    reverse_proxy localhost:3001 {
        header_up Host {host}
        header_up X-Real-IP {remote_ip}
        header_up X-Forwarded-For {remote_ip}
        header_up X-Forwarded-Proto {scheme}
        header_up Connection {>Connection}
        header_up Upgrade {>Upgrade}
    }
}

aiascent.dev {
    # Caddy will automatically handle HTTPS for this domain as well.
    encode zstd gzip
    log {
        output file /var/log/caddy/aiascent_dev.log
    }

    # Reverse proxy all requests for aiascent.dev to the new website server on port 3002.
    reverse_proxy localhost:3002
}

# Optional: Redirect www versions to the main domains
www.aiascent.game {
    redir https://aiascent.game{uri} permanent
}
www.aiascent.dev {
    redir https://aiascent.dev{uri} permanent
}
```

### 4. Action Steps

1.  **DNS:** Point the `aiascent.dev` A record to your server's public IP address.
2.  **Application Ports:** Ensure your two applications are configured to run on different ports (e.g., 3001 and 3002).
3.  **Caddyfile:** Update your `Caddyfile` with the new block for `aiascent.dev`.
4.  **Reload Caddy:** Run `caddy reload` in your server's terminal to apply the new configuration.

Caddy will automatically obtain the SSL certificate for `aiascent.dev` and begin routing traffic to the correct application based on the domain name.