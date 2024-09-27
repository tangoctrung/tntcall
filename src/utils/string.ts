export const convertNameToTwoChar = (name: string) => {
    let data: any[] = name.trim().split(" ")

    if (data?.length <= 0) return "AA"
    if (data?.length == 1) {
        if (data[0]?.trim()?.length <= 1) return data[0][0]?.toUpperCase() + "A";
        return data[0][0]?.toUpperCase() + data[0][1]?.toUpperCase();
    }
    const wordLast: string = data[0]?.trim();
    const wordLast1: string = data[1]?.trim();
    
    return wordLast[0]?.toUpperCase() + (wordLast1?.length > 0 ? wordLast1[0]?.toUpperCase() : "A");

}