import { getLanguageSpecificLogs } from './config';

export function getDebugLog(languageId: string, customMessage: string): string {
    // Fetch user configuration for language-specific logs
    const languageSpecificLogs = getLanguageSpecificLogs();

    // Use the user's log template or the default one if not available
    const logTemplate = languageSpecificLogs[languageId] || '// Log: {message}';

    // Replace the {message} placeholder with the actual customMessage
    const finalLog = logTemplate.replace('{message}', customMessage);

    return finalLog;
}
