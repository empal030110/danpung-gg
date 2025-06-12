export const userUrl = (ocid: string) => {
    const url = `https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${ocid}`;

    return url;
};
