export const hexToRGB = (hex) => {
    if(hex.length != 7){
        return hex;
    }

    var aRgbHex = hex.substring(1).match(/.{1,2}/g);
    var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
    return aRgb;
}