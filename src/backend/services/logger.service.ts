import * as vscode from 'vscode';

export class LoggerService {
    private static instance: LoggerService;
    private outputChannel: vscode.OutputChannel;

    private constructor() {
        this.outputChannel = vscode.window.createOutputChannel("Data Curation Environment");
    }

    public static getInstance(): LoggerService {
        if (!LoggerService.instance) {
            LoggerService.instance = new LoggerService();
        }
        return LoggerService.instance;
    }

    private logMessage(level: 'INFO' | 'WARN' | 'ERROR', message: string): void {
        const timestamp = new Date().toLocaleTimeString();
        this.outputChannel.appendLine(`[${level}] [${timestamp}] ${message}`);
    }

    public log(message: string): void {
        this.logMessage('INFO', message);
    }

    public warn(message: string): void {
        this.logMessage('WARN', message);
    }

    public error(message: string): void {
        this.logMessage('ERROR', message);
    }
}