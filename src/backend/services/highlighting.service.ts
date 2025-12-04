// src/backend/services/highlighting.service.ts
// Updated on: C126 (Add JSON grammar)
import { createStarryNight, common } from '@wooorm/starry-night';
import sourceTsx from '@wooorm/starry-night/source.tsx';
import sourceJs from '@wooorm/starry-night/source.js';
import sourceTs from '@wooorm/starry-night/source.ts';
import sourceCss from '@wooorm/starry-night/source.css';
import sourceScss from '@wooorm/starry-night/source.css.scss';
import textHtml from '@wooorm/starry-night/text.html.basic';
import textMd from '@wooorm/starry-night/text.md';
import sourceJson from '@wooorm/starry-night/source.json'; // C126 Added
import { toHtml } from 'hast-util-to-html';
import { Services } from './services';
import { ServerPostMessageManager } from '@/common/ipc/server-ipc';
import { ServerToClientChannel } from '@/common/ipc/channels.enum';

export class HighlightingService {
    private starryNight: any = null;

    constructor() {
        this.initializeStarryNight();
    }

    private async initializeStarryNight() {
        try {
            // C126: Added sourceJson to the grammars list
            const grammars = [...common, sourceTsx, sourceJs, sourceTs, sourceCss, sourceScss, textHtml, textMd, sourceJson];
            this.starryNight = await createStarryNight(grammars);
            Services.loggerService.log('Starry Night syntax highlighter initialized.');
        } catch (error) {
            Services.loggerService.error(`Failed to initialize Starry Night: ${error}`);
        }
    }
    
    public async handleSyntaxHighlightRequest(code: string, lang: string, id: string, serverIpc: ServerPostMessageManager) {
        if (!this.starryNight) {
            Services.loggerService.error('Starry Night not initialized, cannot highlight.');
            serverIpc.sendToClient(ServerToClientChannel.SendSyntaxHighlight, { highlightedHtml: `<pre><code>${code}</code></pre>`, id });
            return;
        }

        // Map 'json' to 'source.json' explicitly if needed, though starry-night usually handles standard aliases.
        const scope = this.starryNight.flagToScope(lang);
        
        if (!scope) {
            Services.loggerService.warn(`[WARN] No Starry Night scope found for language: ${lang}. Defaulting to plain text.`);
            serverIpc.sendToClient(ServerToClientChannel.SendSyntaxHighlight, { highlightedHtml: `<pre><code>${code}</code></pre>`, id });
            return;
        }

        try {
            const tree = this.starryNight.highlight(code, scope);
            const hastHtml = toHtml(tree);
            const finalHtml = `<pre><code>${hastHtml}</code></pre>`;
            serverIpc.sendToClient(ServerToClientChannel.SendSyntaxHighlight, { highlightedHtml: finalHtml, id });
        } catch (error) {
            Services.loggerService.error(`Starry Night highlighting failed for lang ${lang}: ${error}`);
            serverIpc.sendToClient(ServerToClientChannel.SendSyntaxHighlight, { highlightedHtml: `<pre><code>${code}</code></pre>`, id });
        }
    }

    public async handleHighlightContextRequest(context: string, id: string, serverIpc: ServerPostMessageManager) {
        if (!this.starryNight) {
            serverIpc.sendToClient(ServerToClientChannel.SendHighlightContext, { highlightedHtml: context, id });
            return;
        }

        const scope = this.starryNight.flagToScope('markdown');
        try {
            const tree = this.starryNight.highlight(context, scope);
            const hastHtml = toHtml(tree);
            serverIpc.sendToClient(ServerToClientChannel.SendHighlightContext, { highlightedHtml: hastHtml, id });
        } catch (error) {
            serverIpc.sendToClient(ServerToClientChannel.SendHighlightContext, { highlightedHtml: context, id });
        }
    }
}