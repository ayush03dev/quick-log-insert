import * as vscode from 'vscode';

export function getCustomMessage(): string {
    const config = vscode.workspace.getConfiguration();
    return config.get('quickLogInsert.customMessage') || "DEBUG: {fileName} - Line Number: {lineNumber}";
}

export function getLanguageSpecificLogs(): { [key: string]: string } {
    const config = vscode.workspace.getConfiguration();
    return config.get<{ [key: string]: string }>('quickLogInsert.languageSpecificLogs', {});
}