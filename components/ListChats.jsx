'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import AuthorSec from './AuthorSec';
import { Search, Settings } from 'lucide-react';
import ActiveUsers from './ActiveUsers';
import { demoUsers } from '../demoUser';



const ListChats = (props) => {
    const {handlClickedChat, selectedChatId} = props
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const handleselectUser = (id) =>{
        setSelectedUser(id)
    }

    const filteredUsers = searchTerm
        ? demoUsers.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : [];

    return (
        <div className='flex-1 overflow-y-auto border-r min-h-[100vh] bg-slate-100 custom-scrollbar-container'>
            <AuthorSec />

            {/* Search Input */}

            <div className='relative mx-8'>
                <div className='relative w-full'>
                    <input className="rounded-md h-14 pl-12 pr-2 bg-white w-full !text-[15px] text-slate-600 focus:outline-none border" type="email" placeholder="search any persone"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setSearchTerm('')}
                    />
                    <Search className='absolute top-4 text-slate-600 left-4 h-6 w-6' />
                </div>
                {searchTerm && (
                    <div className='bg-stone-50 border rounded-bl-md p-2 pb-5 rounded-br-md z-10 t shadow-2xl w-full absolute top-13'>
                        <div className='max-h-60 pb-5 overflow-y-auto custom-scrollbar-container'>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user, i) => {
                                    return <div key={i} className='py-2 px-2 rounded cursor-pointer hover:bg-slate-200 flex items-center gap-3 transition-colors duration-200'>
                                        <div>
                                            <Image
                                                alt='author image'
                                                width={50}
                                                height={50}
                                                className='rounded-full border'
                                                src={user.image_uri}
                                            />
                                        </div>
                                        <div className='flex-1'>
                                            <p className='text-md font-semibold text-blue-800'>{user.name}</p>
                                            <p className=''>{user.title}</p>
                                        </div>
                                    </div>
                                })
                            ) : (
                                <p className='text-lg text-center text-slate-400'> No user found </p>
                            )}
                        </div>
                    </div>
                )}

            </div>

            {/* Active User */}
            <ActiveUsers handlClickedChat={handlClickedChat}/>


            {/* User List */}

            <div className='mt-5 px-4 pb-5'>
            {
                demoUsers.map((user, i) => {
                    return (
                        <div onClick={()=>handlClickedChat(user.id)} key={i} className={`py-3 my-1 px-4 border-b rounded cursor-pointer hover:bg-slate-200 flex items-center gap-3 ${selectedChatId === i+1 && 'bg-slate-200'}`}>
                            {/* The key fix is here: a fixed-size parent div with relative positioning */}
                           <div className='relative w-[60px] h-[60px] flex-shrink-0'> 
                                <Image
                                    alt='User Avatar'
                                    fill
                                    sizes='60px'
                                    className='border rounded-full object-cover'
                                    src={user.image_uri}
                                />
                            </div>
                            <div className='flex w-full justify-between'>
                                <div>
                                    <p className='text-md font-semibold text-blue-800'>{user.name}</p>
                                    <p className={`text-sm text-slate-700 ${user.new_message_number > 0 ? 'font-bold' : ''}`}>
                                        {user.message.slice(0, 37) + '...'}
                                    </p>
                                </div>
                                <div className='flex items-end flex-col mt-1'>
                                    <span className='text-sm'>{user.sendTime}</span>
                                    {
                                        user.new_message_number > 0 &&
                                        <div className='font-semibold text-sm text-white bg-blue-800 w-5 h-5 rounded-full flex items-center justify-center'>
                                            {user.new_message_number}
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>

        </div>
    );
};

export default ListChats;

