export function getDebugLog(languageId: string, customMessage: string): string {
    let debugLog: string;

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
            debugLog = `println("${customMessage}");`;
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

    return debugLog;
}
