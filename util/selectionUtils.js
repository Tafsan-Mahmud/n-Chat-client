// Add these functions into ViewChat.jsx or import them.

// Global variable to hold lost selection (still needed as a safety net for range loss)
let lastValidSelectionRange = null; 

// A. Save Selection (Node-Aware)
export const saveSelection = (containerEl) => {
    const selection = window.getSelection();

    // Fallback: If selection is lost, treat the cursor as being at the END
    if (selection.rangeCount === 0 || !containerEl.contains(selection.anchorNode)) {
        const range = document.createRange();
        range.selectNodeContents(containerEl);
        range.collapse(false);
        
        const preSelectionRange = range.cloneRange();
        preSelectionRange.selectNodeContents(containerEl);
        preSelectionRange.setEnd(range.startContainer, range.startOffset);
        
        const endPosition = preSelectionRange.toString().length;
        return { start: endPosition, end: endPosition };
    }
    
    // Normal selection logic
    const range = selection.getRangeAt(0);
    const preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(containerEl);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    const start = preSelectionRange.toString().length;

    return {
        start: start,
        end: start + range.toString().length
    };
};

// B. Restore Selection (Node-Aware)
export const restoreSelection = (containerEl, savedSel) => {
    let charIndex = 0;
    const range = document.createRange();
    range.setStart(containerEl, 0);
    range.collapse(true);
    
    const nodeStack = Array.from(containerEl.childNodes).reverse(); // Start with child nodes
    let node, foundStart = false, stop = false;

    // Process nodes left-to-right (LIFO when pushing, ensuring correct order)
    while (!stop && (node = nodeStack.pop())) {
        if (node.nodeType === 3) { // Text node
            const nextCharIndex = charIndex + node.length;
            
            // Set Start Position
            if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
                range.setStart(node, savedSel.start - charIndex);
                foundStart = true;
            }
            
            // Set End Position
            if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
                range.setEnd(node, savedSel.end - charIndex);
                stop = true;
            }
            charIndex = nextCharIndex;
        } else if (node.nodeType === 1 && node.tagName !== 'IMG') { 
            // Element node (if it's not an IMG, traverse its children)
            let i = node.childNodes.length;
            while (i--) {
                nodeStack.push(node.childNodes[i]);
            }
        }
        // NOTE: We SKIP pushing children if it's an IMG node (Node 1) because the cursor 
        // cannot be inside an image, and it doesn't add to the character count.
    }

    // Fallback for cursor placement
    if (!foundStart || !stop) {
        range.selectNodeContents(containerEl);
        range.collapse(false);
    }
    
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
};