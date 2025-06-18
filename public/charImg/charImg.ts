export const charImgUrl = (name: string) => {
    const baseUrl = `https://file.chuchu.gg/v1/character_bg_png`;
    const url = `${baseUrl}/${name}.png`;
    return url;
};