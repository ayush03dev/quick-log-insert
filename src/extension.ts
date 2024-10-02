import * as vscode from 'vscode';
import { getDebugLog } from './logger';
import { getCustomMessage } from './config';
import { Placeholder } from './placeholders';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('quick-log-insert.insertDebugLog', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const position = editor.selection.active;
			const lineNumber = position.line + 1; // Line numbers are 0-based, so add 1
			const fileName = editor.document.fileName.split('/').pop() || ""; // Get just the file name
			const language = editor.document.languageId;
			const date = new Date().toLocaleDateString();
			const time = new Date().toLocaleTimeString();

			// Initialize the Placeholders class with key-value pairs
			const placeholders = new Placeholder({
				fileName: fileName,
				lineNumber: lineNumber.toString(),
				language: language,
				date: date,
				time: time,
			});

			// Retrieve the custom debug log message from the configuration
			const customMessage = getCustomMessage();

			// Detect the programming language of the active document
			const languageId = editor.document.languageId;

			// Get the debug log format based on the language
			const debugLog = getDebugLog(languageId, customMessage);

			// Replace placeholders in the custom message
			const finalLog = placeholders.replacePlaceholders(debugLog);

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
