import * as vscode from 'vscode';

export function getCustomMessage(): string {
    const config = vscode.workspace.getConfiguration();
    return config.get('quickLogInsert.customMessage') || "DEBUG: {fileName} - Line Number: {lineNumber}";
}
