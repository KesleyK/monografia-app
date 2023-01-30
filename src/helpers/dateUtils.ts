export function getDateFromSeconds(seconds: number): Date {
    if (seconds === undefined || seconds === null) {
        return null;
    }

    const epoch = new Date(1970, 0, 1);
    epoch.setSeconds(seconds);

    return epoch;
}
