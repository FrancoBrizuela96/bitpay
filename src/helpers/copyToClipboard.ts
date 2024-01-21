export const handleCopyToClipboard = async (textToCopy: string) => {
    try {
        await navigator.clipboard.writeText(textToCopy);
    } catch (err) {
        console.error("Unable to copy to clipboard", err);
    }
};
