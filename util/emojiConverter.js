// utils/emojiConverter.js
import { EmojiConvertor } from 'emoji-js';

const emojiConverter = new EmojiConvertor();

// --- Configuration to ensure raw data is available ---
emojiConverter.use_css_sprites = false; // We set this, but ignore if it fails
emojiConverter.img_set = 'apple';
emojiConverter.img_sets.apple.path = 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/';
emojiConverter.img_sets.apple.size = 64; 

// IMPORTANT: We set img_props here for *consistency*, but the regex below overwrites the class/style.
emojiConverter.img_props = {
    class: 'temp-emoji', 
    style: 'display: none;' 
};
// ---------------------------------------------------


/**
 * Converts Unicode text to HTML containing <img> tags, forcibly replacing <span> tags.
 * @param {string} text The raw message text.
 * @returns {string} HTML string with <img> tags for emojis.
 */
export const convertUnicodeToImages = (text) => {
    // 1. Let emoji-js perform the conversion (it outputs the problematic <span>)
    let htmlOutput = emojiConverter.replace_unified(text);

    // 2. FORCED POST-PROCESSING: Use regex to find the <span> and extract the URL
    // This regex looks for:
    // a. The starting <span ... style="background-image:url(URL)">
    // b. Captures the URL
    // c. Captures the data-codepoints (not strictly needed but good to grab)
    // d. Captures the closing </span>
    
    const spanToImgRegex = /<span\s+class="emoji emoji-sizer".*?style="background-image:url\((.*?)\)".*?data-codepoints="(.*?)".*?<\/span>/g;

    // 3. Replace the matched <span> with a standard <img> tag using the captured URL
    htmlOutput = htmlOutput.replace(spanToImgRegex, (match, url, codepoints) => {
        // The captured URL (url) is used as the src for the <img> tag
        return `<img 
            src="${url}" 
            alt="Emoji" 
            class="apple-emoji" 
            style="width: 1.5em; height: 1.5em; vertical-align: -0.2em; display: inline-block;"
        />`;
    });

    return htmlOutput;
};