# Artifact A9: aiascent.dev - GitHub Repository Setup Guide
# Date Created: C0
# Author: AI Model & Curator

- **Key/Value for A0:**
- **Description:** A step-by-step guide with the necessary git commands to initialize the project as a local repository and push it to a new remote repository on GitHub.
- **Tags:** git, github, version control, setup, repository, workflow

## 1. Overview

This guide provides the necessary commands to turn your local `aiascent-dev` project folder into a Git repository and link it to a new, empty repository on GitHub.

## 2. Prerequisites

*   You have `git` installed on your machine.
*   You have a GitHub account.

## 3. Step-by-Step Setup

### Step 1: Create a New Repository on GitHub

1.  Go to [github.com](https://github.com) and log in.
2.  In the top-right corner, click the `+` icon and select **"New repository"**.
3.  **Repository name:** `aiascent-dev`.
4.  **Description:** "Promotional and educational website for the Data Curation Environment (DCE) VS Code Extension."
5.  Choose **"Private"** or **"Public"**.
6.  **IMPORTANT:** Do **not** initialize the repository with a `README`, `.gitignore`, or `license`. We will be pushing our existing files.
7.  Click **"Create repository"**.

GitHub will now show you a page with command-line instructions. We will use the section titled **"...or push an existing repository from the command line"**.

### Step 2: Initialize Git in Your Local Project

Open a terminal and navigate to your project's root directory (`C:\Projects\aiascent-dev`). Then, run the following commands one by one.

1.  **Initialize the repository:**
    ```bash
    git init
    ```

2.  **Add all existing files:**
    ```bash
    git add .
    ```

3.  **Create the first commit:**
    ```bash
    git commit -m "Initial commit: Project setup and Cycle 0 artifacts"
    ```

4.  **Rename the default branch to `main`:**
    ```bash
    git branch -M main
    ```

### Step 3: Link and Push to GitHub

1.  **Add the remote repository:** Replace the placeholder URL with the one from your new GitHub repository page.
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/aiascent-dev.git
    ```

2.  **Push your local `main` branch to GitHub:**
    ```bash
    git push -u origin main
    ```

Your new project is now set up with version control and linked to GitHub. You can now use the DCE's Git-integrated features like "Baseline" and "Restore" as you develop the website.