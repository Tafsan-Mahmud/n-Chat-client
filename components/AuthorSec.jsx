import React from 'react';
import { BellRing, MonitorDot, Settings, SunMoon,Image as Photo, ShieldQuestionMark, TriangleAlert, FileSpreadsheet, ContactRound, DoorClosedLocked, Heart } from 'lucide-react';
import Image from 'next/image';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { redirect, useRouter } from 'next/navigation';
import Link from 'next/link';
const im = 'https://yt3.ggpht.com/yti/ANjgQV_53OCUJNvxFfI_hbBWcFPzQRqcF6YZK-CcsvyPKXX4hho=s88-c-k-c0x00ffffff-no-rj';
const AuthorSec = () => {
    const router = useRouter();
    return (
        <div>
            {/* <h4 className='px-8 py-3 text-xl font-semibold text-blue-800 text-center border-b mb-2'>NChat</h4> */}
            <div className='pb-7 mt-4 px-8 flex items-center gap-3'>
                <div className=''>
                    <Image
                        alt='author image'
                        width={100}
                        height={100}
                        className='rounded-full'
                        src={im} />
                </div>
                <div className='flex w-full justify-between'>
                    <div>
                        <p className='text-xl font-semibold text-slate-700'>Abu Hasnat Nobin<span className='text-sm text-blue-800 cursor-pointer select-none'> @NChat</span></p>
                        <p className='text-md text-slate-600'>Senior Developer</p>
                    </div>
                    <div className='flex items-center border-l pl-2'>
                        <Sheet>
                            <SheetTrigger>
                                <Settings className='text-slate-600 cursor-pointer hover:bg-slate-200 p-2 w-10 h-10 rounded-full transition-colors duration-250' />
                            </SheetTrigger>
                            <SheetContent side='left' className="pb-10 bg-slate-100 min-w-[25%] flex-1 overflow-y-auto h-full custom-scrollbar-drawer">
                                <SheetTitle className="text-center my-3 mx-8 text-lg pb-2 border-b">Settings</SheetTitle>
                                <div className='flex justify-center'>
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
                                <div className='text-center mb-4'>
                                    <p className='text-2xl font-semibold text-slate-800'>Bob Johnson</p>
                                    <p className='text-sm text-slate-600'>Product Manager</p>
                                </div>
                                <div className='mx-4'>
                                    <h5 className='text-lg font-semibold text-slate-600 mb-2'>Customisation</h5>
                                    <div className='rounded-lg p-2 bg-slate-50'>
                                        <div className='w-full'>
                                            <div className='flex text-slate-600 p-2 gap-3 cursor-pointer hover:bg-slate-200 rounded'>
                                                <div><MonitorDot /></div>
                                                <p className='w-full pb-3 border-b font-semibold'>Active Status</p>
                                            </div>
                                        </div>
                                        <div className='w-full'>
                                            <div className='flex text-slate-600 p-2 gap-3 cursor-pointer hover:bg-slate-200 rounded'>
                                                <div><SunMoon /></div>
                                                <p className='w-full pb-3 border-b font-semibold'>Dark Mode</p>
                                            </div>
                                        </div>
                                        <div className='w-full'>
                                            <div className='flex text-slate-600 p-3 gap-3 cursor-pointer hover:bg-slate-200 rounded'>
                                                <div><BellRing /></div>
                                                <p className='w-full pb-3 border-b font-semibold'>Notifications and Sounds</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='mx-4'>
                                    <h5 className='text-lg font-semibold text-slate-600 mt-2 mb-2'>Features</h5>
                                    <div className='rounded-lg p-2 bg-slate-50'>
                                        <div className='w-full '>
                                            <div className='flex text-slate-600 p-2 gap-3 cursor-pointer hover:bg-slate-200 rounded'>
                                                <div><Photo /></div>
                                                <p className='w-full pb-3 border-b font-semibold'>Photos and Media</p>
                                            </div>
                                        </div>
                                        <div className='w-full '>
                                            <div className='flex text-slate-600 p-2 gap-3 cursor-pointer hover:bg-slate-200 rounded'>
                                                <div><Heart /></div>
                                                <p className='w-full pb-3 border-b font-semibold'>Favorite Chats</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='mx-4'>
                                    <h5 className='text-lg font-semibold text-slate-600 mt-2 mb-2'>Actions</h5>
                                    <div className='rounded-lg p-2 bg-slate-50'>
                                        <div className='w-full'>
                                            <div className='flex text-slate-600 p-2 gap-3 cursor-pointer hover:bg-slate-200 rounded'>
                                                <div><ShieldQuestionMark /></div>
                                                <p className='w-full pb-3 border-b font-semibold'>Help</p>
                                            </div>
                                        </div>
                                        <div className='w-full'>
                                            <div className='flex text-slate-600 p-2 gap-3 cursor-pointer hover:bg-slate-200 rounded'>
                                                <div><TriangleAlert /></div>
                                                <p className='w-full pb-3 border-b font-semibold'>Report Something</p>
                                            </div>
                                        </div>
                                        <div className='w-full'>
                                            <div className='flex text-slate-600 p-2 gap-3 cursor-pointer hover:bg-slate-200 rounded'>
                                                <div><FileSpreadsheet /></div>
                                                <p className='w-full pb-3 border-b font-semibold'>Legal and Policies</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='mx-4'>
                                    <h5 className='text-lg font-semibold text-slate-600 mt-2 mb-2'>Account Settings</h5>
                                    <Link href={'/accountSetting'}>
                                    <div  className='rounded-lg p-2 bg-slate-50 hover:bg-slate-200'>
                                        <p className='text-sm text-slate-500 px-2 py-2'>Manage your accounts sensitive informations</p>
                                        <div className='w-full'>
                                            <div className='flex text-slate-600 p-2 gap-3 cursor-pointer'>
                                                <div><ContactRound /></div>
                                                <p className='w-full pb-3 border-b font-semibold'>Personal details</p>
                                            </div>
                                        </div>
                                        <div className='w-full'>
                                            <div className='flex text-slate-600 p-2 gap-3 cursor-pointer'>
                                                <div><DoorClosedLocked /></div>
                                                <p className='w-full pb-3 border-b font-semibold'>Password and Security</p>
                                            </div>
                                        </div>
                                    </div>
                                    </Link>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthorSec;