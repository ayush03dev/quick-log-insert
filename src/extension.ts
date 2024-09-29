import * as vscode from 'vscode';
import { getDebugLog } from './logger';
import { getCustomMessage } from './config';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('quick-log-insert.insertDebugLog', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const position = editor.selection.active;
			const lineNumber = position.line + 1; // Line numbers are 0-based, so add 1
			const fileName = editor.document.fileName.split('/').pop() || ""; // Get just the file name

			// Retrieve the custom debug log message from the configuration
			const customMessage = getCustomMessage();

			// Detect the programming language of the active document
			const languageId = editor.document.languageId;

			// Get the debug log format based on the language
			const debugLog = getDebugLog(languageId, customMessage);

			// Replace placeholders with actual values
			const finalLog = debugLog
				.replace('${fileName}', fileName)
				.replace('${lineNumber}', lineNumber.toString());

			// Insert the debug log at the correct position with proper indentation
			const line = editor.document.lineAt(position.line);
			const indentation = line.firstNonWhitespaceCharacterIndex;

			editor.edit(editBuilder => {
				editBuilder.insert(position.with(undefined, indentation), finalLog);
			});
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
