'use client';
import { useEffect, useRef, useState, } from 'react';
import TopBarViewChat from './TopBarViewChat';
import { Image, SendHorizontal, Smile } from 'lucide-react';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
const messagesData = {
    1: [{ id: 1, text: "Hey Alice!", sender: 'You' }, { id: 2, text: "See you tomorrow!", sender: 'Alice' }],
    2: [{ id: 1, text: "Hi Bob", sender: 'You' }, { id: 2, text: "Sounds good!", sender: 'Bob' }],
    3: [{ id: 1, text: "Hello Charlie", sender: 'You' }, { id: 2, text: "Okay, let me know.", sender: 'Charlie' }],
};

const ViewChat = ({ selectedChat }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (selectedChat) {
            setMessages(messagesData[selectedChat.id] || []);
        }
    }, [selectedChat.id]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const messageToAdd = { id: Date.now(), text: newMessage, sender: 'You' };
        setMessages([...messages, messageToAdd]);
        setNewMessage('');
    };

    return (
        <div className='flex flex-col h-full bg-slate-50 dark:bg-gray-900'>
            <TopBarViewChat />
            <div className="flex-grow overflow-y-auto custom-scrollbar-viewMessege  p-5">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex my-2 ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-3 rounded-lg max-w-xs lg:max-w-md ${msg.sender === 'You' ? 'bg-blue-800 text-white' : 'bg-slate-100 dark:bg-gray-700'}`}>
                            <p>{msg.text}</p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="p-4 bg-slate-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                <form onSubmit={handleSendMessage} className="flex items-center">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 p-3 rounded-full text-slate-600 bg-slate-200 dark:bg-gray-700 border-transparent focus:outline-none focus:ring-2 focus:ring-slate-200"
                    />
                    <div className='flex justify-center items-center ml-3'>
                        <Tooltip>
                            <TooltipTrigger>
                                <Image className='text-slate-600 cursor-pointer w-10 h-10 p-2 hover:bg-slate-100 rounded-full transition-colors duration-250' />
                                </TooltipTrigger>
                            <TooltipContent>
                                <p>send image from gallery</p>
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <Smile className='text-slate-600 cursor-pointer w-10 h-10 p-2 hover:bg-slate-100 rounded-full transition-colors duration-250' />
                                </TooltipTrigger>
                            <TooltipContent>
                                <p>send emoji</p>
                            </TooltipContent>
                        </Tooltip>
                        
                        <button type="submit" className="ml-1 p-3 bg-blue-800 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer">
                            <SendHorizontal />
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default ViewChat;