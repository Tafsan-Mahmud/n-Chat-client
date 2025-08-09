'use client';

import { useState } from 'react';
import ListChats from '../../components/ListChats';
import ViewChat from '../../components/ViewChat';
import DetailUser from '../../components/DetailUser';
const page = () => {
    const [selectedChatId, setSelectedChatId] = useState(1);
    const selectedChat = { id: 1, name: 'Alice', lastMessage: 'See you tomorrow!', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop' };
    return (
        <div className='w-full flex h-screen'>
                <ListChats />
            <div className='w-[50%]'>
            {/* Only render ViewChat if a chat is selected */}
                {selectedChat ? (
                    <ViewChat selectedChat={selectedChat} />
                ) : (
                    <div className='flex items-center justify-center h-full text-gray-500'>
                        Select a chat to view messages
                    </div>
                )}
            </div>
                
            <div className='w-[25%] bg-slate-100 border-l'>
            <DetailUser/>
            </div>
        </div>
    );
};

export default page;