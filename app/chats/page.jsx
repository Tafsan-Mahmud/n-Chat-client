'use client';
import { useState } from 'react';
import ListChats from '../../components/ListChats';
import ViewChat from '../../components/ViewChat';
import DetailUser from '../../components/DetailUser';
import Image from 'next/image';
import logo from '../../public/images/logo/logoName.png'
import LottieMessage from '../../components/LottieMessage';
import { uri } from '../../components/var';
const Page = () => {

    const [selectedChatId, setSelectedChatId] = useState(0);

    const handlClickedChat = (id) => {
        setSelectedChatId(id);
        //    console.log(id)
    }
    return (
        <div className='w-full flex h-screen'>
            <ListChats handlClickedChat={handlClickedChat} selectedChatId={selectedChatId} />
            <div className={`${selectedChatId ? 'w-[50%]' : 'w-[75%]'}`}>
                {/* Only render ViewChat if a chat is selected */}
                {selectedChatId ? (
                    <ViewChat selectedChatId={selectedChatId} />
                ) : (
                    <div className='relative flex flex-col gap-2 items-center  justify-center h-full text-gray-500'>
                        <LottieMessage />
                        <div className='absolute top-5 right-5'>
                            <Image
                                className='w-[170px]'
                                alt='logo'
                                src={logo}
                            />
                        </div>
                        <div className='text-center animate-fadeInUpWithDelay'>
                            <span className='text-5xl font-semibold text-blue-800'>NChat Web </span>
                            <p className='text-slate-600 text-xl'>Chose a person to start the conversation</p>
                        </div>
                        <style>
                            {`
                                @keyframes fadeInUpWithDelay {
                                0% {
                                    opacity: 0;
                                    transform: translateY(15px);
                                }
                                100% {
                                    opacity: 1;
                                    transform: translateY(0);
                                }
                                }

                                /* This utility class applies the animation. */
                                .animate-fadeInUpWithDelay {
                                opacity: 0;
                                animation-name: fadeInUpWithDelay;
                                animation-duration: 1s;
                                animation-delay: 200ms;
                                animation-timing-function: ease-out;
                                animation-fill-mode: forwards;
                                }`
                            }
                        </style>
                    </div>
                )}
            </div>
            <div className={`${selectedChatId ? 'w-[25%] bg-slate-100 border-l' : ''}`}>
                {
                    selectedChatId ?
                        <DetailUser selectedChatId={selectedChatId} /> : ''
                }
            </div>
        </div>
    );
};

export default Page; 