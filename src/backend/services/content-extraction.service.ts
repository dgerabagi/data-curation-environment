// src/backend/services/content-extraction.service.ts
import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs/promises";
import { ServerPostMessageManager } from "@/common/ipc/server-ipc";
import { ServerToClientChannel } from "@/common/ipc/channels.enum";
import { Services } from "./services";
// @ts-ignore
import pdf from 'pdf-parse/lib/pdf-parse.js';
import * as XLSX from 'xlsx';
import mammoth from 'mammoth';

export class ContentExtractionService {
    private pdfTextCache = new Map<string, { text: string; tokenCount: number }>();
    private excelMarkdownCache = new Map<string, { markdown: string; tokenCount: number }>();
    private wordTextCache = new Map<string, { text: string; tokenCount: number }>();

    public getVirtualPdfContent(filePath: string) {
        return this.pdfTextCache.get(filePath);
    }

    public getVirtualExcelContent(filePath: string) {
        return this.excelMarkdownCache.get(filePath);
    }

    public getVirtualWordContent(filePath: string) {
        return this.wordTextCache.get(filePath);
    }

    public async handlePdfToTextRequest(filePath: string, serverIpc: ServerPostMessageManager) {
        Services.loggerService.log(`Received RequestPdfToText for: ${filePath}`);
        if (this.pdfTextCache.has(filePath)) {
            const cached = this.pdfTextCache.get(filePath)!;
            serverIpc.sendToClient(ServerToClientChannel.UpdateNodeStats, { path: filePath, tokenCount: cached.tokenCount });
            Services.loggerService.log(`PDF served from cache: ${filePath}`);
            return;
        }

        try {
            Services.loggerService.log(`[PDF] Processing: ${filePath}`);
            const buffer = await fs.readFile(filePath);
            const data = await pdf(buffer);
            const text = data.text;
            const tokenCount = Math.ceil(text.length / 4);
            
            this.pdfTextCache.set(filePath, { text, tokenCount });
            Services.loggerService.log(`PDF Parsed and cached: ${path.basename(filePath)} (${tokenCount} tokens)`);

            serverIpc.sendToClient(ServerToClientChannel.UpdateNodeStats, { path: filePath, tokenCount: tokenCount });
        } catch (error: any) {
            const errorMessage = `Failed to parse PDF: ${path.basename(filePath)}`;
            Services.loggerService.error(`[PDF] Error processing ${filePath}: ${error.stack || error.message}`);
            serverIpc.sendToClient(ServerToClientChannel.UpdateNodeStats, { path: filePath, tokenCount: 0, error: errorMessage });
        }
    }

    private _sheetToMarkdown(sheet: XLSX.WorkSheet): string {
        const data: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        if (data.length === 0) return "";
    
        const sanitizedData = data.map(row => 
            row.map(cell => {
                const cellStr = cell ? String(cell) : '';
                return cellStr.replace(/\|/g, '\\|').replace(/\r?\n/g, '<br/>');
            })
        );
    
        const header = sanitizedData[0];
        const body = sanitizedData.slice(1);
        const headerLine = `| ${header.join(' | ')} |`;
        const separatorLine = `| ${header.map(() => '---').join(' | ')} |`;
        const bodyLines = body.map(row => `| ${row.join(' | ')} |`).join('\n');
        return `${headerLine}\n${separatorLine}\n${bodyLines}`;
    }

    public async handleExcelToTextRequest(filePath: string, serverIpc: ServerPostMessageManager) {
        Services.loggerService.log(`Received RequestExcelToText for: ${filePath}`);
        if (this.excelMarkdownCache.has(filePath)) {
            const cached = this.excelMarkdownCache.get(filePath)!;
            serverIpc.sendToClient(ServerToClientChannel.UpdateNodeStats, { path: filePath, tokenCount: cached.tokenCount });
            Services.loggerService.log(`Excel served from cache: ${filePath}`);
            return;
        }

        try {
            Services.loggerService.log(`[Excel] Processing: ${filePath}`);
            const buffer = await fs.readFile(filePath);
            const workbook = XLSX.read(buffer, { type: 'buffer' });
            
            let markdown = '';
            workbook.SheetNames.forEach(sheetName => {
                markdown += `### Sheet: ${sheetName}\n\n`;
                const worksheet = workbook.Sheets[sheetName];
                markdown += this._sheetToMarkdown(worksheet);
                markdown += '\n\n';
            });

            const tokenCount = Math.ceil(markdown.length / 4);
            this.excelMarkdownCache.set(filePath, { markdown, tokenCount });
            Services.loggerService.log(`Excel Parsed and cached: ${path.basename(filePath)} (${tokenCount} tokens)`);

            serverIpc.sendToClient(ServerToClientChannel.UpdateNodeStats, { path: filePath, tokenCount: tokenCount });
        } catch (error: any) {
             const errorMessage = `Failed to parse Excel/CSV file: ${path.basename(filePath)}`;
             Services.loggerService.error(`[Excel] Error processing ${filePath}: ${error.stack || error.message}`);
             serverIpc.sendToClient(ServerToClientChannel.UpdateNodeStats, { path: filePath, tokenCount: 0, error: errorMessage });
        }
    }

    public async handleWordToTextRequest(filePath: string, serverIpc: ServerPostMessageManager) {
        Services.loggerService.log(`Received RequestWordToText for: ${filePath}`);
        if (this.wordTextCache.has(filePath)) {
            const cached = this.wordTextCache.get(filePath)!;
            serverIpc.sendToClient(ServerToClientChannel.UpdateNodeStats, { path: filePath, tokenCount: cached.tokenCount });
            Services.loggerService.log(`Word served from cache: ${filePath}`);
            return;
        }

        const extension = path.extname(filePath).toLowerCase();
        if (extension === '.doc') {
            const unsupportedMessage = "UNSUPPORTED_FORMAT";
            this.wordTextCache.set(filePath, { text: unsupportedMessage, tokenCount: 0 });
            Services.loggerService.warn(`[Word] Legacy .doc format is not supported for file: ${filePath}`);
            serverIpc.sendToClient(ServerToClientChannel.UpdateNodeStats, { path: filePath, tokenCount: 0, error: "Legacy .doc format not supported." });
            return;
        }

        try {
            Services.loggerService.log(`[Word] Processing: ${filePath}`);
            const buffer = await fs.readFile(filePath);
            const result = await mammoth.extractRawText({ buffer });
            const text = result.value;
            const tokenCount = Math.ceil(text.length / 4);
            
            this.wordTextCache.set(filePath, { text, tokenCount });
            Services.loggerService.log(`Word Parsed and cached: ${path.basename(filePath)} (${tokenCount} tokens)`);

            serverIpc.sendToClient(ServerToClientChannel.UpdateNodeStats, { path: filePath, tokenCount: tokenCount });
        } catch (error: any) {
            let errorMessage = `Failed to parse Word file: ${path.basename(filePath)}`;
            if (error instanceof Error && error.message.includes("Can't find end of central directory")) {
                errorMessage = "File may be corrupted or is not a valid .docx format.";
            }
            Services.loggerService.error(`[Word] Error processing ${filePath}: ${error.stack || error.message}`);
            serverIpc.sendToClient(ServerToClientChannel.UpdateNodeStats, { path: filePath, tokenCount: 0, error: errorMessage });
        }
    }
}