export function normalizeString(str: string) {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s/g, "");
}

export function verifyStringInclusion(completedStr: string, includedStr: string) {
    if (!includedStr.length) return true;
    return completedStr.includes(includedStr);
}
