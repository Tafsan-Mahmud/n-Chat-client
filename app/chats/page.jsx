'use client';
import { useState } from 'react';
import ListChats from '../../components/ListChats';
import ViewChat from '../../components/ViewChat';
import DetailUser from '../../components/DetailUser';
import Image from 'next/image';
import logo from '../../public/images/logo/logoName.png'
const Page = () => {

    const [selectedChatId, setSelectedChatId] = useState(0);

    const handlClickedChat = (id) => {
        setSelectedChatId(id);
        //    console.log(id)
    }
    return (
        <div className='w-full flex h-screen'>
            <ListChats handlClickedChat={handlClickedChat} selectedChatId={selectedChatId} />
            <div className='w-[50%]'>
                {/* Only render ViewChat if a chat is selected */}
                {selectedChatId ? (
                    <ViewChat selectedChatId={selectedChatId} />
                ) : (
                    <div className='flex flex-col gap-2 items-center  justify-center h-full text-gray-500'>
                        Select a chat to view messagess
                        <Image
                            className='w-[250px] h-[110px]'
                            alt='logo'
                            src={logo}
                        />

                    </div>
                )}
            </div>

            <div className='w-[25%] bg-slate-100 border-l'>
                {
                    selectedChatId ?
                        <DetailUser selectedChatId={selectedChatId} /> : ''
                }
            </div>
        </div>
    );
};

export default Page; 