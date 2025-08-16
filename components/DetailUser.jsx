import React, { useEffect, useState } from 'react';
import ActiveUsers from './ActiveUsers';
import Image from 'next/image';
import logo from '../public/images/logo/logoName.png';
import { Ban, Heart, Palette, SmilePlus, Trash2, TriangleAlert, UserPen, Users } from 'lucide-react';
import { demoUsers } from '../demoUser';

const DetailUser = (props) => {
    const {selectedChatId} = props
    const [selectedUser, setSelectedUser] = useState(
        {
    id: 10,
    name: "Jack Taylor",
    title: "Sales Representative",
    image_uri: "https://yt3.ggpht.com/A4I8QX3OIpQGjYiQ7eOp9sZZYchkQSACtMXQZ64HYalx_3DHTRXfTTH8YbFuqdwJP6L7A1SE3Q=s88-c-k-c0x00ffffff-no-rj",
    message: "I closed the deal! I'll update the records in the CRM.",
    sendTime: "1:45 PM",
    new_message_number: 10
  }
    );
        useEffect(()=>{
            if(selectedChatId){
                const findSelectedUser = demoUsers.find(data =>data.id === selectedChatId);
                setSelectedUser(findSelectedUser)
            }
        },[selectedChatId])
    return (
        <div className='relative flex-1 overflow-y-auto h-full custom-scrollbar-userDetails'>
            {/* active Users */}
            {/* <ActiveUsers /> */}
            {/* user Details  */}
            {/* topbar logo */}
            <div className='h-22 w-full border-b flex items-center justify-center'>
                <Image
                className='w-[135px] h-[70px]'
                    alt='logo'
                    src={logo}
                />
            </div>
            <div className='flex justify-center mt-4'>
                <div className='w-25 h-25 flex justify-center items-center'>
                    <Image
                        alt='author image'
                        width={100}
                        height={100}
                        className='rounded-full border'
                        src={selectedUser.image_uri}
                    />
                </div>
            </div>
            <div className='text-center mb-7'>
                <p className='text-2xl font-semibold text-slate-800'>{selectedUser.name}</p>
                <p className='text-sm text-slate-600'>{selectedUser.title}</p>
            </div>
            {/*customisation card  */}
            <div className='mx-4'>
                <h5 className='text-lg font-semibold text-slate-600 mb-2'>Customisation</h5>
                <div className='rounded-lg p-2 bg-slate-50'>
                    <div className='w-full'>
                        <div className='flex text-slate-600 p-2 gap-3 cursor-pointer hover:bg-slate-200 rounded'>
                            <div><Palette /></div>
                            <p className='w-full pb-3 border-b font-semibold'>Theme</p>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='flex text-slate-600 p-2 gap-3 cursor-pointer hover:bg-slate-200 rounded'>
                            <div><SmilePlus /></div>
                            <p className='w-full pb-3 border-b font-semibold'>Quick Reaction</p>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='flex text-slate-600 p-3 gap-3 cursor-pointer hover:bg-slate-200 rounded'>
                            <div><UserPen /></div>
                            <p className='w-full pb-3 border-b font-semibold'>Nicknames</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mx-4'>
                <h5 className='text-lg font-semibold text-slate-600 mt-2 mb-2'>Features</h5>
                <div className='rounded-lg p-2 bg-slate-50'>
                    <div className='w-full'>
                        <div className='flex text-slate-600 p-2 gap-3 cursor-pointer hover:bg-slate-200 rounded'>
                            <div><Heart /></div>
                            <p className='w-full pb-3 border-b font-semibold'>Add to favorites</p>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='flex text-slate-600 p-2 gap-3 cursor-pointer hover:bg-slate-200 rounded'>
                            <div><Users /></div>
                            <p className='w-full pb-3 border-b font-semibold'>Create Group with Bob Jhonsom</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mx-4'>
                <h5 className='text-lg font-semibold text-slate-600 mt-2 mb-2'>Actions</h5>
                <div className='rounded-lg p-2 bg-slate-50'>
                    <div className='w-full'>
                        <div className='flex text-slate-600 p-2 gap-3 cursor-pointer hover:bg-slate-200 rounded'>
                            <div><Ban /></div>
                            <p className='w-full pb-3 border-b font-semibold'>Block User</p>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='flex text-slate-600 p-2 gap-3 cursor-pointer hover:bg-slate-200 rounded'>
                            <div><TriangleAlert /></div>
                            <p className='w-full pb-3 border-b font-semibold'>Report Something</p>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='flex text-red-600 p-2 gap-3 hover:bg-slate-200 cursor-pointer rounded '>
                            <div><Trash2 /></div>
                            <p className='w-full pb-3 border-b font-semibold'>Delete Chat</p>
                        </div>

                    </div>
                </div>
            </div>
            <div className='mx-4'>
                <h5 className='text-lg font-semibold text-slate-600 mt-2 mb-2'>Attachments</h5>

                <div className='flex-wrap select-none'>
                    {
                        demoUsers.map((data, i) => {
                            return <div key={i} className='inline-block mr-3 mb-2 select-none'>
                                <div className='w-19 h-19 flex justify-center items-center select-none'>
                                    <Image
                                        alt='author image'
                                        width={76}
                                        height={76}
                                        className='rounded cursor-pointer select-none'
                                        src={data.image_uri}
                                    />
                                </div>
                            </div>
                        })
                    }
                </div>
                <div className='flex-wrap'>
                    {
                        demoUsers.map((data, i) => {
                            return <div key={i} className='inline-block mr-3 mb-2'>
                                <div className='w-19 h-19 flex justify-center items-center'>
                                    <Image
                                        alt='author image'
                                        width={76}
                                        height={76}
                                        className='rounded cursor-pointer'
                                        src={data.image_uri}
                                    />
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default DetailUser;

