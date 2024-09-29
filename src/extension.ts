import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('quick-log-insert.insertDebugLog', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			// Get the current file name and line number
			const position = editor.selection.active;
			const lineNumber = position.line + 1; // Line numbers are 0-based, so add 1
			const fileName = editor.document.fileName.split('/').pop() || ""; // Get just the file name

			// Get the indentation level of the current line
			const line = editor.document.lineAt(position.line);
			const indentation = line.firstNonWhitespaceCharacterIndex;

			// Retrieve the custom debug log message from the configuration
			const config = vscode.workspace.getConfiguration();
			const customMessage = config.get<string>('debugLogMessage') || "DEBUG: ${fileName} - Line Number: ${lineNumber}";

			// Detect the programming language of the active document
			const languageId = editor.document.languageId;
			let debugLog: string;

			// Define language-specific log formats and handle quotes
			switch (languageId) {
				case 'javascript':
				case 'typescript':
				case 'typescriptreact':
				case 'javascriptreact':
					debugLog = `console.log("${customMessage}");`;
					break;
				case 'python':
					debugLog = `print("${customMessage}")`;
					break;
				case 'java':
					debugLog = `System.out.println("${customMessage}");`;
					break;
				case 'csharp':
					debugLog = `Console.WriteLine("${customMessage}");`;
					break;
				case 'ruby':
					debugLog = `puts("${customMessage}")`;
					break;
				case 'php':
					debugLog = `error_log("${customMessage}");`;
					break;
				case 'go':
					debugLog = `log.Println("${customMessage}")`;
					break;
				case 'swift':
					debugLog = `print("${customMessage}")`;
					break;
				case 'kotlin':
					debugLog = `println("${customMessage}")`;
					break;
				case 'rust':
					debugLog = `println!("${customMessage}");`;
					break;
				case 'scala':
					debugLog = `println("${customMessage}");`;
					break;
				case 'html':
					debugLog = `<!-- ${customMessage} -->`; // HTML comments
					break;
				case 'css':
					debugLog = `/* ${customMessage} */`; // CSS comments
					break;
				case 'shellscript':
				case 'bash':
					debugLog = `echo "${customMessage}"`;
					break;
				case 'objectivec':
					debugLog = `NSLog(@"${customMessage}");`;
					break;
				case 'haskell':
					debugLog = `putStrLn ("${customMessage}")`;
					break;
				case 'elixir':
					debugLog = `IO.puts("${customMessage}")`;
					break;
				case 'dart':
					debugLog = `print("${customMessage}");`;
					break;
				case 'groovy':
					debugLog = `println("${customMessage}")`;
					break;
				case 'lua':
					debugLog = `print("${customMessage}")`;
					break;
				case 'r':
					debugLog = `cat("${customMessage}")`;
					break;
				default:
					debugLog = `// Log: ${customMessage}`; // Fallback for unsupported languages
					break;
			}

			// Replace placeholders with actual values
			const finalLog = debugLog
				.replace('${fileName}', fileName)
				.replace('${lineNumber}', lineNumber.toString());

			// Insert the debug log at the correct position with proper indentation
			editor.edit(editBuilder => {
				editBuilder.insert(position.with(undefined, indentation), finalLog);
			});
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() { }
