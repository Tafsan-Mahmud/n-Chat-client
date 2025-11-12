'use client';
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import TopBarViewChat from './TopBarViewChat';
import { Image, SendHorizontal, Smile } from 'lucide-react';
// Assuming fkMessege is correctly defined and imported
import { fkMessege } from '../fakeMessege';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import dynamic from 'next/dynamic';
const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

// IMPORTANT: Ensure this utility is configured as detailed previously.
// It must import 'emoji-js' and set the Apple image paths.
import { convertUnicodeToImages } from '../util/emojiConverter';

// --- ChatMessage Component (Renders the Bubble with Apple Emojis) ---
const ChatMessage = ({ message, isSender }) => {
    // 1. Convert Unicode text (e.g., "Hello 👍") to HTML (text + <img> tags)
    const contentWithImages = useMemo(() => convertUnicodeToImages(message.message), [message.message]);

    return (
        <div className={`flex my-2 ${isSender ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-lg max-w-xs lg:max-w-md ${isSender ? 'bg-blue-800 text-white' : 'bg-slate-100 dark:bg-gray-700'}`}>
                {/* 2. DANGER: Use dangerouslySetInnerHTML to render the <img> tags */}
                <p
                    className="message-content"
                    // CRITICAL: Must use dangerouslySetInnerHTML
                    dangerouslySetInnerHTML={{ __html: contentWithImages }}
                />
            </div>
        </div>
    );
};
// --------------------------------------------------------------------


const ViewChat = (props) => {
    const senderid = 15;
    const { selectedChatId } = props;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);
    const [isPickerOpen, setIsPickerOpen] = useState(false);
    const fileInputRef = useRef(null);
    const isClosingRef = useRef(false);
    const inputRef = useRef(null);
    const getAppleEmojiHtml = (emojiData) => {
        // Get the Unicode Hex code (e.g., '1f44d')
        const unicode = emojiData.unified;

        // Get the actual Unicode character (e.g., '😃')
        const emojiChar = emojiData.emoji;

        const baseUrl = 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/';
        const styleString = 'width: 1.5em; height: 1.5em; vertical-align: -0.2em; display: inline-block;';

        // CRITICAL: Embed the raw Unicode character into a data attribute
        return `<img 
        src="${baseUrl}${unicode}.png" 
        alt="${emojiChar}" 
        class="apple-emoji" 
        data-unicode="${emojiChar}" 
        style="${styleString}"
    />`;
    };
    // 1. Handler to sync the contentEditable div's text to state
    // Inside ViewChat component:
    // Inside ViewChat component:
    const handleInputContentChange = useCallback(() => {
        const inputEl = inputRef.current;
        if (!inputEl) {
            setNewMessage('');
            return;
        }

        let finalMessageText = '';

        // --- Data Extraction Logic (No change needed here) ---
        inputEl.childNodes.forEach(node => {
            if (node.nodeType === 3) { // Node is a Text Node
                finalMessageText += node.textContent;
            } else if (node.nodeType === 1 && node.tagName === 'IMG') { // Node is an <img>
                const unicodeChar = node.getAttribute('data-unicode');
                if (unicodeChar) {
                    finalMessageText += unicodeChar;
                }
            }
        });
        // --- End Data Extraction Logic ---

        // 🔥 CRITICAL FIX: Force the div to be truly empty if the final message text is blank
        if (finalMessageText.trim() === '' && inputEl.innerHTML !== '') {
            // Clear the DOM content to ensure the browser recognizes it as :empty
            inputEl.innerHTML = '';
        }

        // Set the clean Unicode string state
        setNewMessage(finalMessageText);
    }, []);

    const handleEmojiSelect = useCallback((emojiData) => {
        const inputEl = inputRef.current;
        if (!inputEl) return;

        // 1. Generate the Apple-style HTML (with embedded data-unicode)
        const emojiHtml = getAppleEmojiHtml(emojiData);

        // 2. Ensure focus
        inputEl.focus();


        // --- CRITICAL INSERTION AND CURSOR FIX ---

        // Append the new image HTML to the end of the input's content
        inputEl.innerHTML += emojiHtml;

        // 3. Move the cursor to the very end of the content
        const range = document.createRange();
        const selection = window.getSelection();

        // Select the entire content of the div
        range.selectNodeContents(inputEl);

        // Collapse the range to the end (moves the cursor there)
        range.collapse(false);

        // Apply the new cursor position
        selection.removeAllRanges();
        selection.addRange(range);
        // ------------------------------------------

        // 4. Update the state (reads data-unicode attributes)
        handleInputContentChange();
    }, [getAppleEmojiHtml, handleInputContentChange]);

    // 3. Handler to manage Enter key submission
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevents a new line in the div
            // Trigger form submission via the form handler
            handleSendMessage(e);
        }
    }, [newMessage]); // Depend on newMessage to ensure we use the latest value

    // --- Data Loading Logic ---
    const chatsMap = useMemo(() => {
        const map = new Map();
        for (const message of fkMessege) {
            const key = message.participants.sort((a, b) => a - b).join('-');
            if (!map.has(key)) {
                map.set(key, []);
            }
            map.get(key).push(message);
        }
        return map;
    }, []);

    useEffect(() => {
        if (selectedChatId) {
            const key = [selectedChatId, senderid].sort((a, b) => a - b).join('-');
            const chatMessages = chatsMap.get(key) || [];
            setMessages(chatMessages);
        } else {
            setMessages([]);
        }
    }, [selectedChatId, chatsMap, senderid]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    // ----------------------------

    // 4. Send message handler
    const handleSendMessage = (e) => {
        e.preventDefault();
        const textToSend = newMessage.trim();
        console.log(newMessage)
        if (textToSend === '') return;

        const messageToAdd = {
            id: Date.now(),
            message: textToSend, // Clean Unicode text is stored here
            senderID: senderid,
            receiverId: selectedChatId,
            participants: [senderid, selectedChatId],
            sendTime: 'Now',
            status: 'sent'
        };

        setMessages([...messages, messageToAdd]);
        setNewMessage('');

        // Clear the contentEditable div after sending
        if (inputRef.current) {
            inputRef.current.innerHTML = '';
        }
    };

    return (

        <div className='flex flex-col h-full bg-slate-50 dark:bg-gray-900'>
            <TopBarViewChat selectedChatId={selectedChatId} />
            <div className="flex-grow overflow-y-auto custom-scrollbar-viewMessege p-5">
                {/* CORRECTED: Use the ChatMessage component for rendering */}
                {messages.map((msg, i) => (
                    <ChatMessage
                        key={`${msg.id}${i}`}
                        message={msg}
                        isSender={msg.senderID === senderid}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 bg-slate-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                <form onSubmit={handleSendMessage} className="flex items-center">

                    {/* The contentEditable div replaces the Input */}
                    <div
                        ref={inputRef}
                        contentEditable="true"
                        placeholder="Type a message..."
                        // Keep this simple, optimized Tailwind class
                        className="flex-1 items-center p-3 rounded-full text-slate-600 text-lg bg-slate-200 dark:bg-gray-700 border-transparent focus:outline-none focus:ring-2 focus:ring-slate-200 empty:before:text-slate-400 empty:before:pointer-events-none empty:before:content-[attr(placeholder)]"
                        onInput={handleInputContentChange}
                        onKeyDown={handleKeyDown}
                    />

                    <div className='flex justify-center items-center ml-3'>
                        {/* Image button (existing) */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={(e) => {
                                // Handle the selected file here
                                const selectedFile = e.target.files?.[0];
                                if (selectedFile) {
                                    console.log("Selected file:", selectedFile);
                                    // TODO: Add logic here to preview/upload the file
                                }
                                // Clear the input value so the same file can be selected again later
                                e.target.value = null;
                            }}
                            // Hide the input visually
                            style={{ display: 'none' }}
                            accept="image/*" // Optional: Restrict to image files
                        />
                        <Image onClick={() => fileInputRef.current?.click()} className='text-slate-600 cursor-pointer w-10 h-10 p-2 hover:bg-slate-100 rounded-full transition-colors duration-250' />
                        {/* Emoji Picker Popover */}
                        <Popover
                            open={isPickerOpen}
                            onOpenChange={(newOpenState) => {
                                // If the Popover is trying to CLOSE (newOpenState is false)
                                if (!newOpenState) {
                                    // Check if the closing lock is currently active
                                    if (isClosingRef.current) {
                                        // If the lock is active, ignore this close attempt
                                        // The state will remain TRUE (open)
                                        return;
                                    }
                                }
                                // If the Popover is trying to OPEN (newOpenState is true) OR 
                                // if the lock is inactive (user clicked outside/trigger), set the state normally.
                                setIsPickerOpen(newOpenState);
                            }}
                        >
                            <PopoverTrigger asChild>
                                <Smile
                                    className='text-slate-600 cursor-pointer w-10 h-10 p-2 hover:bg-slate-100 rounded-full transition-colors duration-250'
                                />
                            </PopoverTrigger>

                            <PopoverContent
                                onOpenAutoFocus={(e) => e.preventDefault()}
                                className="w-full p-0 shadow-xl"
                            // onClick is no longer needed here.
                            >
                                <div
                                    // We use onPointerDown to aggressively lock the closing immediately on interaction
                                    onPointerDown={() => {
                                        isClosingRef.current = true; // Activate the lock
                                    }}
                                    // We use onPointerUp/onMouseUp to release the lock slightly later
                                    onMouseUp={() => {
                                        setTimeout(() => {
                                            isClosingRef.current = false; // Release the lock
                                        }, 50); // A small delay is crucial
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="emoji-picker-wrapper"
                                >
                                    <EmojiPicker
                                        onEmojiClick={(emojiData, event) => {
                                            event.stopPropagation();
                                            handleEmojiSelect(emojiData);
                                        }}
                                        emojiStyle="apple"
                                        theme="light"
                                        lazyLoadEmojis={true}
                                        previewConfig={{ showPreview: false }}
                                        searchDisabled={false}
                                    />
                                </div>
                            </PopoverContent>
                        </Popover>

                        <button type="submit" className="ml-1 p-3 bg-blue-800 text-white rounded-full hover:bg-blue-700 focus:outline-none cursor-pointer">
                            <SendHorizontal />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ViewChat;