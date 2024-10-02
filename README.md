# Quick Log Insert 

 The Quick Log Insert extension simplifies the process of inserting customizable debug log statements into your code across multiple languages. I created this extension to address a common issue I faced when debugging—figuring out exactly where my code was breaking. I used to add console logs after several lines of code to verify that everything was working fine, but this became a tedious task. That's why I built this extension: it allows you to insert unique, custom logs with just a shortcut, making the debugging process faster and more efficient!

## Features

- **Language-specific debug log insertion**: Automatically inserts the appropriate log statement depending on the language you're working with (e.g., `console.log()` for JavaScript, `print()` for Python).
- **Customizable log message**: Use placeholders like `{fileName}`, `{lineNumber}`, `{functionName}`, etc., to generate dynamic log messages.
- **Keybinding support**: Quickly insert a debug log using configurable keybindings.
- **User-defined log formats**: Override the default log statements with your own preferred format for each language.
- **Placeholder configuration**: Easily customize the placeholders used in the log message template.

## Installation

1. Download and install the extension from the [Visual Studio Marketplace](https://marketplace.visualstudio.com).
2. Reload or restart VSCode to activate the extension.

## Usage

### Insert Debug Log

1. Open any source file in VSCode.
2. Press the default keybinding (e.g., `Ctrl+D`) or use the command palette (`Cmd+Shift+P` or `Ctrl+Shift+P`) and search for `Quick Log Insert`.
3. The extension will automatically insert a language-appropriate log statement at the current line.

### Customizing Log Format

You can customize the log message format using the VSCode settings.

1. Open your settings (`Cmd+,` or `Ctrl+,`).
2. Add the following settings to your `settings.json` file:
   ```json
   {
     "quickLogInsert.languageSpecificLogs": {
       "javascript": "console.log('Custom JS Log: {message}');",
       "python": "print('Custom Python Log: {message}')"
     },
     "quickLogInsert.customMessage": "DEBUG: {fileName} - Line Number: {lineNumber}"
   }
