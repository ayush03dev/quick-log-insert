import * as vscode from 'vscode';

export function getCustomMessage(): string {
    const config = vscode.workspace.getConfiguration();
    return config.get<string>('debugLogMessage') || "DEBUG: {fileName} - Line Number: {lineNumber}";
}
