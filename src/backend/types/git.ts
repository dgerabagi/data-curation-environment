// This file is a placeholder for the complex types from the vscode.git extension API.
// It helps with type safety in our code without needing the full extension as a dev dependency.

import * as vscode from 'vscode';

export interface GitExtension {
    getAPI(version: 1): API;
}

export interface API {
    readonly state: 'uninitialized' | 'initialized';
    readonly onDidOpenRepository: vscode.Event<Repository>;
    readonly onDidCloseRepository: vscode.Event<Repository>;
    readonly repositories: Repository[];
}

export interface Repository {
    readonly rootUri: vscode.Uri;
    readonly state: RepositoryState;
}

export interface RepositoryState {
    readonly HEAD: Branch | undefined;
    readonly workingTreeChanges: Change[];
    readonly indexChanges: Change[];
    readonly mergeChanges: Change[];
    readonly untrackedChanges: vscode.Uri[]; // This is not in the official API, but we use it conceptually
    readonly onDidChange: vscode.Event<void>;
}

export interface Change {
    readonly uri: vscode.Uri;
    readonly originalUri: vscode.Uri;
    readonly renameUri: vscode.Uri | undefined;
    readonly status: Status;
}

export interface Branch {
    readonly type: RefType;
    readonly name?: string;
    readonly commit?: string;
    readonly upstream?: Upstream;
}

export interface Upstream {
    readonly remote: string;
    readonly name: string;
}

export const enum RefType {
    Head,
    RemoteHead,
    Tag
}

export const enum Status {
    INDEX_MODIFIED,
    INDEX_ADDED,
    INDEX_DELETED,
    INDEX_RENAMED,
    INDEX_COPIED,

    MODIFIED,
    DELETED,
    UNTRACKED,
    IGNORED,
    INTENT_TO_ADD,

    ADDED_BY_US,
    ADDED_BY_THEM,
    DELETED_BY_US,
    DELETED_BY_THEM,
    MODIFIED_BY_US,
    MODIFIED_BY_THEM,

    CONFLICT, // Both Added
    BOTH_DELETED, // Both Deleted
    BOTH_MODIFIED, // Both Modified
}