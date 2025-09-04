import * as vscode from "vscode";

export function getViewHtml({ webview, nonce, scriptUri, styleUris = [] }: { webview: vscode.Webview; nonce: string; scriptUri: string; styleUris?: vscode.Uri[]; }): string {
    const styles = styleUris.map(uri => `<link href="${uri}" rel="stylesheet">`).join('\n');
    
    // C181: Updated CSP to support Monaco Editor's web workers and fonts.
    const csp = `
        default-src 'none';
        style-src ${webview.cspSource} 'unsafe-inline';
        script-src 'nonce-${nonce}';
        font-src ${webview.cspSource};
        worker-src ${webview.cspSource} blob:;
    `.trim();

    return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="Content-Security-Policy" content="${csp}">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            ${styles}
        </head>
        <body>
            <div id="root"></div>
            <script nonce="${nonce}" src="${scriptUri}"></script>
        </body>
        </html>`;
}

function getNonce() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
export { getNonce };