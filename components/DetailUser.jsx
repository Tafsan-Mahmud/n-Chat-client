import React from 'react';
import ActiveUsers from './ActiveUsers';
import Image from 'next/image';
import { Ban, Heart, Palette, SmilePlus, Trash2, TriangleAlert, UserPen, Users } from 'lucide-react';
import { demoUsers } from './ListChats';
const im = 'https://yt3.ggpht.com/Way4TqSlkTcuLw9q6Q9lth3NKNt6-tEl5rWMbxiyUrbnJAYuST48TQAio_8JmWHmyXmMFcBt=s88-c-k-c0x00ffffff-no-rj';

const DetailUser = () => {
    return (
        <div className='flex-1 overflow-y-auto h-full custom-scrollbar-userDetails'>
            {/* active Users */}
            {/* <ActiveUsers /> */}
            {/* user Details  */}
            <div className='flex justify-center mt-4'>
                <div className='w-25 h-25 flex justify-center items-center'>
                    <Image
                        alt='author image'
                        width={100}
                        height={100}
                        className='rounded-full border'
                        src={im}
                    />
                </div>
            </div>
            <div className='text-center mb-7'>
                <p className='text-2xl font-semibold text-slate-800'>Bob Johnson</p>
                <p className='text-sm text-slate-600'>Product Manager</p>
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
                        <div className='flex text-red-600 p-2 gap-3 cursor-pointer hover:bg-red-200 rounded '>
                            <div><Trash2 /></div>
                            <p className='w-full pb-3 border-b font-semibold'>Delete Chat</p>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className='mx-4'>
                <h5 className='text-lg font-semibold text-slate-600 mt-2 mb-2'>Attachments</h5>

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

