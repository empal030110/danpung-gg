export const getToDate = (): string => {
    const date = new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().split("T")[0];
    return date;
};
