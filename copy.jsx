

'use client';
import { useEffect, useRef, useState, } from 'react';
import TopBarViewChat from './TopBarViewChat';
import { Image, SendHorizontal, Smile } from 'lucide-react';
import { fkMessege } from '../fakeMessege';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"


const ViewChat = (props) => {
    const senderid = 15;
    const { selectedChatId } = props
    console.log(selectedChatId)
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (selectedChatId) {
            const filteredMessege = fkMessege.filter(
                (data) =>
                    (data.receiverId === selectedChatId && data.senderID === senderid) ||
                    (data.senderID === selectedChatId && data.receiverId === senderid)
            );
            console.log(filteredMessege);
            setMessages(filteredMessege || []);
        }
    }, [selectedChatId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const messageToAdd = { id: 5, message: newMessage, senderID: 15, receiverId: selectedChatId, participants: [15, selectedChatId], sendTime: '1h ago', status: 'read' };
        setMessages([...messages, messageToAdd]);
        setNewMessage('');
    };

    return (
        <div className='flex flex-col h-full bg-slate-50 dark:bg-gray-900'>
            <TopBarViewChat />
            <div className="flex-grow overflow-y-auto custom-scrollbar-viewMessege  p-5">
                {messages.map((msg, i) => (
                    <div key={`${msg.id}${i}}`} className={`flex my-2 ${msg.senderID === 15 ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-3 rounded-lg max-w-xs lg:max-w-md ${msg.senderID === 15 ? 'bg-blue-800 text-white' : 'bg-slate-100 dark:bg-gray-700'}`}>
                            <p>{msg.message}</p>
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