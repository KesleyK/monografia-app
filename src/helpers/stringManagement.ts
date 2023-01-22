export function normalizeString(str: string): string {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s/g, "");
}

export function verifyStringInclusion(completedStr: string, includedStr: string): boolean {
    if (!includedStr.length) return true;
    return completedStr.includes(includedStr);
}

export function extractFirstName(name: string): string {
    name = name?.trim();
    if (!name) {
        return "";
    }

    return name.split(" ")[0];
}

export function limitCharacters(s: string, n: number): string {
    return s == null || s.length <= n ? s :
        s.substring(0, n - 3) + "...";
}
