import * as vscode from 'vscode';

export function getDebugLog(languageId: string, customMessage: string): string {
    // Fetch user configuration for language-specific logs
    const config = vscode.workspace.getConfiguration();
    const languageSpecificLogs = config.get<{ [key: string]: string }>('quickLogInsert.languageSpecificLogs', {});

    // Fallback log templates if the user hasn't set any custom configuration
    const defaultLogs: { [key: string]: string } = {
        'javascript': 'console.log("{message}");',
        'typescript': 'console.log("{message}");',
        'python': 'print("{message}")',
        'java': 'System.out.println("{message}");',
        'csharp': 'Console.WriteLine("{message}");',
        'ruby': 'puts("{message}")',
        'php': 'error_log("{message}");',
        'go': 'log.Println("{message}")',
        'swift': 'print("{message}")',
        'kotlin': 'println("{message}")',
        'rust': 'println!("{message}");',
        'scala': 'println("{message}");',
        'shellscript': 'echo "{message}"',
        'bash': 'echo "{message}"',
        'objectivec': 'NSLog(@"{message}");',
        'haskell': 'putStrLn ("{message}")',
        'elixir': 'IO.puts("{message}")',
        'dart': 'print("{message}");',
        'groovy': 'println("{message}")',
        'lua': 'print("{message}")',
        'r': 'cat("{message}")',
        'html': '<!-- {message} -->', // HTML comments
        'css': '/* {message} */', // CSS comments
    };

    // Use the user's log template or the default one if not available
    const logTemplate = languageSpecificLogs[languageId] || defaultLogs[languageId] || '// Log: {message}';

    // Replace the {message} placeholder with the actual customMessage
    const finalLog = logTemplate.replace('{message}', customMessage);

    return finalLog;
}
