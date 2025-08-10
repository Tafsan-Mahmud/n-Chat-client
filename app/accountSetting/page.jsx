'use client'
import { ChevronLeft, CloudUpload } from 'lucide-react';
import { redirect, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import Image from 'next/image';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
const im = 'https://yt3.ggpht.com/Way4TqSlkTcuLw9q6Q9lth3NKNt6-tEl5rWMbxiyUrbnJAYuST48TQAio_8JmWHmyXmMFcBt=s88-c-k-c0x00ffffff-no-rj';
const page = () => {
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };
    return (
        <div className='w-full min-h-[100vh] bg-slate-100 flex justify-center items-center'>
            <div className='bg-slate-50 w-[30%] min-h-[92vh] rounded p-4 relative'>
                <div onClick={() => router.push('/chats')} className='absolute  text-lg top-6 text-slate-600 hover:text-slate-500'>
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
                <h1 className='text-2xl text-center font-semibold text-blue-800 border-b pb-4'>Account Settings</h1>
                {/* personal details */}
                <div className='my-4'>
                    <h4 className='text-xl font-semibold text-slate-600 mt-5 mb-3'>Personal Details</h4>
                    <div className='bg-slate-100 py-6 px-4 rounded-md flex gap-4'>
                        <div className='flex justify-start'>
                            <div className='flex flex-col justify-center items-center gap-3 border-r pr-3'>
                                <div className='w-25 h-25 flex justify-center items-center'>
                                    <Image
                                        alt='author image'
                                        width={100}
                                        height={100}
                                        className='rounded-full border'
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

                </div>
                {/* Password and Security */}
                <div className='my-4'>
                    <h4 className='text-xl font-semibold text-slate-600 mt-7 mb-3'>Password and Security</h4>
                    <div className='bg-slate-100 py-6 px-4 rounded-md'>
                        <div className="">
                            <Label htmlFor="currentpass" className='text-slate-700'>Current Password</Label>
                            <Input className='text-slate-700 mb-4 mt-2 bg-slate-50' type="text" id="currentpass" placeholder="enter current password" />

                            <Label htmlFor="newpass" className='text-slate-700'>New Password</Label>
                            <Input className='text-slate-700 mb-4 mt-2 bg-slate-50' type="text" id="newpass" placeholder="enter new password" />

                            <Label htmlFor="confirmpass" className='text-slate-700'>Confirm Password</Label>
                            <Input className='text-slate-700 mb-3 mt-2 bg-slate-50' type="text" id="confirmpass" placeholder="enter confirm password" />

                            <div className='flex justify-end'>
                                <p onClick={()=>router.push('/forgotPass')} className='text-slate-600 w-30 cursor-pointer hover:text-blue-700 underline my-4'>forgot password</p>
                            </div>
                        </div>
                        <Button className='bg-blue-800 rounded-sm w-full cursor-pointer hover:bg-blue-900'>Change Password</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;