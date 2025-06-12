export const ocidUrl = (name: string) => {
    const url = `https://open.api.nexon.com/maplestory/v1/id?character_name=${name}`;

    return url;
};
