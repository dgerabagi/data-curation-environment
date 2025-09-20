// src/backend/providers/ResponseContentProvider.ts
// New file in C27
import * as vscode from 'vscode';
import { Services } from '../services/services';

export class ResponseContentProvider implements vscode.TextDocumentContentProvider {
    public readonly onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
    public readonly onDidChange = this.onDidChangeEmitter.event;

    // A simple cache to hold the in-memory content of AI responses
    private contentCache = new Map<string, string>();

    public provideTextDocumentContent(uri: vscode.Uri): string {
        Services.loggerService.log(`[ResponseContentProvider] Providing content for URI: ${uri.toString()}`);
        return this.contentCache.get(uri.toString()) || '// Content not found for this response.';
    }

    public cacheContent(uri: vscode.Uri, content: string): void {
        Services.loggerService.log(`[ResponseContentProvider] Caching content for URI: ${uri.toString()}`);
        this.contentCache.set(uri.toString(), content);
        // Notify VS Code that the content for this URI has changed (or is now available)
        this.onDidChangeEmitter.fire(uri);
    }
}