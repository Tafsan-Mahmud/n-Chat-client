'use client'
import { Camera, ChevronLeft, CloudUpload } from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import logo from '../../public/images/logo/logoName.png';
import Image from 'next/image';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import camera from '@/public/images/logo/camera.png'

const img1 = 'https://i.ibb.co/NdHTBW2v/hero-4.jpg'
const img2 = 'https://i.ibb.co/KjNsdBwY/hero-3.jpg'
const img3 = 'https://i.ibb.co/vxFCjXvm/hero-2.jpg'
const avatar = 'https://i.ibb.co/F4dr8xh7/thumb-girl.jpg'
const im = 'https://yt3.ggpht.com/Way4TqSlkTcuLw9q6Q9lth3NKNt6-tEl5rWMbxiyUrbnJAYuST48TQAio_8JmWHmyXmMFcBt=s88-c-k-c0x00ffffff-no-rj';

// Changed from 'const page = () => { ... }' to a named function export
export default function Page() {
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    return (
        <div className='w-full relative min-h-screen bg-slate-100 flex justify-center items-center'>
            <Link href={'/chats'}>
                <div className='cursor-pointer absolute top-2 left-5 w-[150px] h-[80px]'>
                    <Image
                        alt='logo'
                        src={logo}
                    />
                </div>
            </Link>

            <div className='bg-slate-50 w-[35%] min-h-[92vh] rounded'>
                <div className='relative h-[28vh] bg-gradient-to-r from-[#fff] to-blue-600 rounded-tr-lg rounded-tl-lg'>
                    <div className='py-4 px-4 z-10'>
                        <Link href={'/chats'}>
                            <div className='absolute text-lg top-6 text-slate-600 hover:text-slate-500'>
                                <Tooltip>
                                    <TooltipTrigger className="flex justify-center items-center gap-1 cursor-pointer">
                                        <ChevronLeft />
                                        <span>Home</span>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Back To Chats</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        </Link>
                        <h1 className='text-lg text-center font-semibold text-gray-700 border-b border-gray-600 pb-4'>Update Account</h1>
                        {/* hero section */}
                        <div className='my-5 flex justify-center'>
                            <div>
                                <div className='flex items-center just justify-center'>
                                    <div className='relative flex items-center just justify-center gap-8 w-[20vh] my-3'>
                                        <div className=' absolute z-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70px] rounded-full h-[70px] flex justify-center items-center'>
                                            <Image
                                                alt='author image'
                                                fill
                                                className='rounded-full shadow-xl border-3 border-white object-cover'
                                                src={img1}
                                            />
                                        </div>
                                        <div className='relative w-[65px] h-[65px] flex justify-center items-center'>
                                            <Image
                                                alt='author image'
                                                fill
                                                className='shadow-xl rounded-full border object-cover'
                                                src={img2}
                                            />
                                        </div>
                                        <div className='relative w-[65px] h-[65px] flex justify-center items-center'>
                                            <Image
                                                alt='author image'
                                                fill
                                                className='shadow-xl rounded-full border object-cover'
                                                src={img3}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <h3 className='text-2xl mb-1 font-bold text-gray-700'>Revamp Your Profile</h3>
                                    <p className='text-gray-700'>Update your profile to reflect the best version of yourselt.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* image chose section*/}
                <div className='flex justify-center items-center gap-2 my-5'>
                    <div className='flex flex-col justify-center items-center gap-1'>
                        <div className='relative w-[80px] h-[80px] flex justify-center items-center'>
                            <Image
                                alt='author image'
                                fill
                                className='shadow-xl rounded-full object-cover'
                                src={avatar}
                            />
                            <div className='absolute flex justify-center items-center rounded-full'>
                                <div className='bg-gray-900 opacity-50 absolute rounded-full w-[80px] h-[80px]'>

                                </div>
                                <Image
                                    alt='camera'
                                    width={25}
                                    height={25}
                                    className='z-2 mt-8'
                                    src='/images/logo/camera.png'
                                />
                            </div>
                        </div>
                        <h3  className='font-semibold text-gray-700'>Chose Avatar</h3>
                    </div>
                    <div>------ or ------</div>
                    <div className='flex flex-col justify-center items-center gap-1'>
                        <div className='relative w-[80px] h-[80px] flex justify-center items-center'>
                            <Image
                                alt='author image'
                                fill
                                className='shadow-xl rounded-full object-cover'
                                src={im}
                            />
                            <div className='absolute flex justify-center items-center rounded-full'>
                                <div className='bg-gray-900 opacity-50 absolute rounded-full w-[80px] h-[80px]'>

                                </div>
                                <Image
                                    alt='camera'
                                    width={25}
                                    height={25}
                                    className='z-2 mt-8'
                                    src='/images/logo/camera.png'
                                />
                            </div>
                        </div>
                        <h3 className='font-semibold text-gray-700'>Chose Photo</h3>
                    </div>
                </div>


                {/* personal details */}
                {/* <div className='my-4 px-4'>
                    <h4 className='text-xl font-semibold text-slate-600 mt-5 mb-3'>Personal Details</h4>
                    <div className='bg-slate-100 py-6 px-4 rounded-md flex gap-4'>
                        <div className='flex justify-start'>
                            <div className='flex flex-col justify-center items-center gap-3 border-r pr-3'>
                                <div className='relative w-[100px] h-[100px] flex justify-center items-center'>
                                    <Image
                                        alt='author image'
                                        fill
                                        className='rounded-full border object-cover'
                                        src={im}
                                    />
                                </div>
                                <div className="">
                                    <label
                                        htmlFor="file-input"
                                        className="cursor-pointer border-blue-800 bg-blue-100 hover:bg-blue-200 border-1 px-2 py-1 rounded-sm flex justify-center items-center gap-1 w-35 transition-colors duration-250 text-xs"
                                    >
                                        <CloudUpload className='w-5 h-5' />
                                        {selectedFile ? selectedFile.name : "Choose a photo"}
                                    </label>
                                    <input
                                        id="file-input"
                                        type="file"
                                        className="hidden"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <Button className='bg-blue-800 w-full rounded-sm cursor-pointer hover:bg-blue-900'>Upload</Button>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className="">
                                <Label htmlFor="name" className='text-slate-700'>Name</Label>
                                <Input className='text-slate-700 mb-4 mt-2 bg-slate-50' type="text" id="name" placeholder="your name" />

                                <Label htmlFor="title" className='text-slate-700'>Title</Label>
                                <Input className='text-slate-700 mb-4 mt-2 bg-slate-50' type="text" id="title" placeholder="your title" />

                                <Label htmlFor="bio">Your Bio <span className='text-slate-500'>'optional'</span></Label>
                                <Textarea placeholder="Type your bio here." className='text-slate-700 mb-4 mt-2 bg-slate-50' id="bio" />
                            </div>
                            <Button className='bg-blue-800 rounded-sm w-full cursor-pointer hover:bg-blue-900'>Save Change</Button>
                        </div>
                        <div>

                        </div>
                    </div>

                </div> */}
                {/* Password and Security */}
            </div>
        </div>
    );
};
