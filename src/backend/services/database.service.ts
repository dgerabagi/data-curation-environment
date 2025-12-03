// src/backend/services/database.service.ts
// Updated on: C123 (Add environment version logging)
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import Database from 'better-sqlite3';
import { Services } from './services';
import { PcppCycle, PcppResponse } from '@/common/types/pcpp.types';

export class DatabaseService {
    private db: Database.Database | null = null;
    private dbPath: string | undefined;

    constructor() {}

    public initialize() {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders || workspaceFolders.length === 0) {
            Services.loggerService.warn("No workspace open, database cannot be initialized.");
            return;
        }

        const vscodeDir = path.join(workspaceFolders[0].uri.fsPath, '.vscode');
        if (!fs.existsSync(vscodeDir)) {
            fs.mkdirSync(vscodeDir);
        }
        this.dbPath = path.join(vscodeDir, 'dce.db');

        // Log environment details to help debug native module mismatches
        Services.loggerService.log(`[Env] Node: ${process.versions.node}, Electron: ${process.versions['electron'] || 'N/A'}, ABI: ${process.versions.modules}`);

        try {
            this.db = new Database(this.dbPath);
            this.db.pragma('journal_mode = WAL');
            this.createTables();
            this.migrateFromLegacyJson();
            Services.loggerService.log(`Database initialized at ${this.dbPath}`);
        } catch (error) {
            Services.loggerService.error(`Failed to initialize database: ${error}`);
        }
    }

    private createTables() {
        if (!this.db) return;

        this.db.exec(`
            CREATE TABLE IF NOT EXISTS key_value_store (
                key TEXT PRIMARY KEY,
                value TEXT
            );

            CREATE TABLE IF NOT EXISTS cycles (
                id INTEGER PRIMARY KEY,
                title TEXT,
                timestamp TEXT,
                cycle_context TEXT,
                ephemeral_context TEXT,
                tab_count INTEGER,
                active_tab INTEGER,
                is_parsed_mode INTEGER,
                is_sorted_by_tokens INTEGER,
                selected_response_id TEXT,
                left_pane_width INTEGER,
                status TEXT,
                connection_mode TEXT,
                active_workflow_step TEXT,
                is_ephemeral_context_collapsed INTEGER
            );

            CREATE TABLE IF NOT EXISTS responses (
                cycle_id INTEGER,
                tab_id TEXT,
                content TEXT,
                status TEXT,
                start_time INTEGER,
                thinking_end_time INTEGER,
                end_time INTEGER,
                thinking_tokens INTEGER,
                response_tokens INTEGER,
                parsed_content TEXT, -- JSON string
                PRIMARY KEY (cycle_id, tab_id),
                FOREIGN KEY (cycle_id) REFERENCES cycles(id) ON DELETE CASCADE
            );
        `);
    }

    private migrateFromLegacyJson() {
        if (!this.db || !this.dbPath) return;
        
        const jsonPath = path.join(path.dirname(this.dbPath), 'dce_history.json');
        if (!fs.existsSync(jsonPath)) return;

        // Check if DB is empty
        const row = this.db.prepare('SELECT count(*) as count FROM cycles').get() as { count: number };
        if (row.count > 0) return; // Already populated

        Services.loggerService.log("Migrating legacy dce_history.json to SQLite...");
        
        try {
            const content = fs.readFileSync(jsonPath, 'utf-8');
            const history = JSON.parse(content);

            if (history.projectScope) {
                this.setGlobalValue('project_scope', history.projectScope);
            }

            const insertCycle = this.db.prepare(`
                INSERT INTO cycles (id, title, timestamp, cycle_context, ephemeral_context, tab_count, active_tab, is_parsed_mode, is_sorted_by_tokens, selected_response_id, left_pane_width, status, connection_mode, active_workflow_step, is_ephemeral_context_collapsed)
                VALUES (@id, @title, @timestamp, @cycleContext, @ephemeralContext, @tabCount, @activeTab, @isParsedMode, @isSortedByTokens, @selectedResponseId, @leftPaneWidth, @status, @connectionMode, @activeWorkflowStep, @isEphemeralContextCollapsed)
            `);

            const insertResponse = this.db.prepare(`
                INSERT INTO responses (cycle_id, tab_id, content, status, start_time, thinking_end_time, end_time, thinking_tokens, response_tokens, parsed_content)
                VALUES (@cycleId, @tabId, @content, @status, @startTime, @thinkingEndTime, @endTime, @thinkingTokens, @responseTokens, @parsedContent)
            `);

            const transaction = this.db.transaction((cycles: PcppCycle[]) => {
                for (const cycle of cycles) {
                    insertCycle.run({
                        id: cycle.cycleId,
                        title: cycle.title,
                        timestamp: cycle.timestamp,
                        cycleContext: cycle.cycleContext,
                        ephemeralContext: cycle.ephemeralContext,
                        tabCount: cycle.tabCount || 4,
                        activeTab: cycle.activeTab || 1,
                        isParsedMode: cycle.isParsedMode ? 1 : 0,
                        isSortedByTokens: cycle.isSortedByTokens ? 1 : 0,
                        selectedResponseId: cycle.selectedResponseId || null,
                        leftPaneWidth: cycle.leftPaneWidth || 33,
                        status: cycle.status || 'complete',
                        connectionMode: (cycle as any).connectionMode || null,
                        activeWorkflowStep: cycle.activeWorkflowStep || null,
                        isEphemeralContextCollapsed: cycle.isEphemeralContextCollapsed ? 1 : 0
                    });

                    for (const [tabId, resp] of Object.entries(cycle.responses)) {
                        insertResponse.run({
                            cycleId: cycle.cycleId,
                            tabId: tabId,
                            content: resp.content,
                            status: resp.status,
                            startTime: resp.startTime || null,
                            thinkingEndTime: resp.thinkingEndTime || null,
                            endTime: resp.endTime || null,
                            thinkingTokens: resp.thinkingTokens || 0,
                            responseTokens: resp.responseTokens || 0,
                            parsedContent: resp.parsedContent ? JSON.stringify(resp.parsedContent) : null
                        });
                    }
                }
            });

            transaction(history.cycles);
            
            fs.renameSync(jsonPath, jsonPath + '.bak');
            Services.loggerService.log("Migration complete. Legacy file renamed to .bak");

        } catch (error) {
            Services.loggerService.error(`Migration failed: ${error}`);
        }
    }

    public setGlobalValue(key: string, value: any) {
        if (!this.db) return;
        const stmt = this.db.prepare(`INSERT INTO key_value_store (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = ?`);
        const strVal = JSON.stringify(value);
        stmt.run(key, strVal, strVal);
    }

    public getGlobalValue<T>(key: string): T | undefined {
        if (!this.db) return undefined;
        const row = this.db.prepare('SELECT value FROM key_value_store WHERE key = ?').get(key) as { value: string } | undefined;
        if (row) return JSON.parse(row.value);
        return undefined;
    }

    public getCycle(id: number): PcppCycle | null {
        if (!this.db) return null;
        const cycleRow = this.db.prepare('SELECT * FROM cycles WHERE id = ?').get(id) as any;
        if (!cycleRow) return null;

        const responseRows = this.db.prepare('SELECT * FROM responses WHERE cycle_id = ?').all(id) as any[];
        const responses: { [key: string]: PcppResponse } = {};
        
        responseRows.forEach(r => {
            responses[r.tab_id] = {
                content: r.content,
                status: r.status,
                startTime: r.start_time,
                thinkingEndTime: r.thinking_end_time,
                endTime: r.end_time,
                thinkingTokens: r.thinking_tokens,
                responseTokens: r.response_tokens,
                parsedContent: r.parsed_content ? JSON.parse(r.parsed_content) : null
            };
        });

        return {
            cycleId: cycleRow.id,
            title: cycleRow.title,
            timestamp: cycleRow.timestamp,
            cycleContext: cycleRow.cycle_context,
            ephemeralContext: cycleRow.ephemeral_context,
            tabCount: cycleRow.tab_count,
            activeTab: cycleRow.active_tab,
            isParsedMode: !!cycleRow.is_parsed_mode,
            isSortedByTokens: !!cycleRow.is_sorted_by_tokens,
            selectedResponseId: cycleRow.selected_response_id,
            leftPaneWidth: cycleRow.left_pane_width,
            status: cycleRow.status,
            activeWorkflowStep: cycleRow.active_workflow_step,
            isEphemeralContextCollapsed: !!cycleRow.is_ephemeral_context_collapsed,
            responses
        };
    }

    public getAllCycles(): PcppCycle[] {
        if (!this.db) return [];
        const cycleRows = this.db.prepare('SELECT id FROM cycles ORDER BY id ASC').all() as { id: number }[];
        return cycleRows.map(row => this.getCycle(row.id)!);
    }

    public saveCycle(cycle: PcppCycle) {
        if (!this.db) return;
        
        const upsertCycle = this.db.prepare(`
            INSERT INTO cycles (id, title, timestamp, cycle_context, ephemeral_context, tab_count, active_tab, is_parsed_mode, is_sorted_by_tokens, selected_response_id, left_pane_width, status, connection_mode, active_workflow_step, is_ephemeral_context_collapsed)
            VALUES (@id, @title, @timestamp, @cycleContext, @ephemeralContext, @tabCount, @activeTab, @isParsedMode, @isSortedByTokens, @selectedResponseId, @leftPaneWidth, @status, @connectionMode, @activeWorkflowStep, @isEphemeralContextCollapsed)
            ON CONFLICT(id) DO UPDATE SET
                title=@title, cycle_context=@cycleContext, ephemeral_context=@ephemeralContext, tab_count=@tabCount, active_tab=@activeTab, is_parsed_mode=@isParsedMode,
                is_sorted_by_tokens=@isSortedByTokens, selected_response_id=@selectedResponseId, left_pane_width=@leftPaneWidth, status=@status,
                connection_mode=@connectionMode, active_workflow_step=@activeWorkflowStep, is_ephemeral_context_collapsed=@isEphemeralContextCollapsed
        `);

        const upsertResponse = this.db.prepare(`
            INSERT INTO responses (cycle_id, tab_id, content, status, start_time, thinking_end_time, end_time, thinking_tokens, response_tokens, parsed_content)
            VALUES (@cycleId, @tabId, @content, @status, @startTime, @thinkingEndTime, @endTime, @thinkingTokens, @responseTokens, @parsedContent)
            ON CONFLICT(cycle_id, tab_id) DO UPDATE SET
                content=@content, status=@status, start_time=@startTime, thinking_end_time=@thinkingEndTime, end_time=@endTime,
                thinking_tokens=@thinkingTokens, response_tokens=@responseTokens, parsed_content=@parsedContent
        `);

        const transaction = this.db.transaction(() => {
            upsertCycle.run({
                id: cycle.cycleId,
                title: cycle.title,
                timestamp: cycle.timestamp,
                cycleContext: cycle.cycleContext,
                ephemeralContext: cycle.ephemeralContext,
                tabCount: cycle.tabCount || 4,
                activeTab: cycle.activeTab || 1,
                isParsedMode: cycle.isParsedMode ? 1 : 0,
                isSortedByTokens: cycle.isSortedByTokens ? 1 : 0,
                selectedResponseId: cycle.selectedResponseId || null,
                leftPaneWidth: cycle.leftPaneWidth || 33,
                status: cycle.status || 'complete',
                connectionMode: (cycle as any).connectionMode || null,
                activeWorkflowStep: cycle.activeWorkflowStep || null,
                isEphemeralContextCollapsed: cycle.isEphemeralContextCollapsed ? 1 : 0
            });

            for (const [tabId, resp] of Object.entries(cycle.responses)) {
                upsertResponse.run({
                    cycleId: cycle.cycleId,
                    tabId: tabId,
                    content: resp.content,
                    status: resp.status,
                    startTime: resp.startTime || null,
                    thinkingEndTime: resp.thinkingEndTime || null,
                    endTime: resp.endTime || null,
                    thinkingTokens: resp.thinkingTokens || 0,
                    responseTokens: resp.responseTokens || 0,
                    parsedContent: resp.parsedContent ? JSON.stringify(resp.parsedContent) : null
                });
            }
        });

        transaction();
    }

    public deleteCycle(id: number) {
        if (!this.db) return;
        this.db.prepare('DELETE FROM cycles WHERE id = ?').run(id);
        // Cascade delete on responses is handled by schema constraint, but better-sqlite3 might need explicit check depending on build
        this.db.prepare('DELETE FROM responses WHERE cycle_id = ?').run(id);
    }

    public reset() {
        if (!this.db) return;
        this.db.exec('DELETE FROM cycles; DELETE FROM responses; DELETE FROM key_value_store;');
    }
}