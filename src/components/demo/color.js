import { useState } from "../../utils/sven.js"

const getRandBaseST = () => Math.floor(Math.random() * 16).toString(16)

const getRandColor = () => `#${Array.from({ length: 6 }, getRandBaseST).join('')}`

const getLuminance = (hex) => {
    // Normalize short hex to full form
    if (hex.length === 4) {
        hex = `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
    }
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    // Apply gamma correction
    const correct = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
    return 0.2126 * correct(r) + 0.7152 * correct(g) + 0.0722 * correct(b);
};

const getContrastRatio = (hex1, hex2) => {
    const lum1 = getLuminance(hex1);
    const lum2 = getLuminance(hex2);
    return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
};

const getAccessibleTextColor = (backgroundHex, isLargeText = false) => {
    const whiteContrast = getContrastRatio(backgroundHex, "#FFFFFF");

    // Choose the color with the higher contrast ratio that meets the threshold
    if (isLargeText) {
        return whiteContrast >= 3 ? "#FFFFFF" : "#000000";
    }
    return whiteContrast >= 4.5 ? "#FFFFFF" : "#000000";
};

export const Color = () => {
    const [bgColor, setBgColor] = useState('#ffffff')
    const accessibleTextColor = getAccessibleTextColor(bgColor)
    const accessibleTextColorLg = getAccessibleTextColor(bgColor, true)

    return {
        tag: 'div',
        props: {
            style: 'display: flex; gap: 20px;',
            children: [
                {
                    tag: 'button',
                    props: {
                        click: () => {
                            setBgColor(getRandColor())
                        },
                        style: `background-color: ${bgColor}; color: ${accessibleTextColor};`,
                        children: ["click me"]
                    }
                },
                {
                    tag: 'button',
                    props: {
                        click: () => {
                            setBgColor(getRandColor())
                        },
                        style: `font-size: 20px; background-color: ${bgColor}; color: ${accessibleTextColorLg};`,
                        children: ["click me"]
                    }
                }
            ]
        },
    }
}