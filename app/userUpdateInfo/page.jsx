'use client'
import React, { useState } from 'react';
import { ChevronLeft, Check, ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils"
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

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
const img1 = 'https://i.ibb.co/NdHTBW2v/hero-4.jpg'
const img2 = 'https://i.ibb.co/KjNsdBwY/hero-3.jpg'
const img3 = 'https://i.ibb.co/vxFCjXvm/hero-2.jpg'
const avatar = 'https://i.ibb.co/F4dr8xh7/thumb-girl.jpg'
const im = 'https://yt3.ggpht.com/Way4TqSlkTcuLw9q6Q9lth3NKNt6-tEl5rWMbxiyUrbnJAYuST48TQAio_8JmWHmyXmMFcBt=s88-c-k-c0x00ffffff-no-rj';

import { avatarJSON } from '@/public/avatarJSon/avatar';

const frameworks = [
    {
        value: "Software Engineer",
        label: "Software Engineer",
    },
    {
        value: "Technician",
        label: "Technician",
    },
    {
        value: "Student",
        label: "Student",
    },
    {
        value: "Founder",
        label: "Founder",
    },
    {
        value: "Founder & CEO",
        label: "Founder & CEO",
    },

    {
        value: "Marketing HR",
        label: "Marketing HR",
    },
    {
        value: "Teacher",
        label: "Teacher",
    },
]
export default function Page() {
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState(null);
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("");
    const [avatarData, setAvatarData] = useState(avatarJSON);
    const handleGenderAvatar = (gender) => {
        if (gender === 'all') {
            setAvatarData(avatarJSON)
        } else {
            const filter = avatarJSON.filter(x => x.gender == gender)
            setAvatarData(filter)
        }
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    return (
        <div className='w-full relative min-h-screen bg-slate-100 flex justify-center items-center p-5 max-md:p-20'>
            <Link href={'/chats'}>
                <div className='cursor-pointer fixed top-2 left-5 w-[150px] h-[80px]'>
                    <Image
                        alt='logo'
                        src={logo}
                        priority 
                    />
                </div>
            </Link>

            <div className='bg-slate-50 w-[90%] md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-[30%] pb-10 rounded'>
                <div className='relative bg-gradient-to-r from-[#fff] to-blue-300 rounded-tr-lg rounded-tl-lg'>
                    <div className='py-4 px-5 z-10'>
                        <Link href={'/chats'}>
                            <div className='absolute text-lg top-4 text-slate-600 hover:text-slate-500'>
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
                        <h1 className='text-lg text-center max-md:text-md font-semibold text-gray-700 border-b border-gray-600 pb-4'>Update Account</h1>
                        {/* hero section */}
                        <div className='my-5 flex justify-center'>
                            <div>
                                <div className='flex items-center justify-center'>
                                    <div className='relative flex items-center justify-center gap-8 w-full max-w-[200px] my-3'>
                                        <div className=' absolute z-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70px] rounded-full h-[70px] flex justify-center items-center'>
                                            <Image
                                                alt='author image'
                                                fill
                                                className='rounded-full shadow-xl border-3 border-white object-cover'
                                                src={img1}
                                                sizes="70px"
                                            />
                                        </div>
                                        <div className='relative w-[65px] h-[65px] flex justify-center items-center'>
                                            <Image
                                                alt='author image'
                                                fill
                                                className='shadow-xl rounded-full border object-cover'
                                                src={img2}
                                                sizes="65px"
                                            />
                                        </div>
                                        <div className='relative w-[65px] h-[65px] flex justify-center items-center'>
                                            <Image
                                                alt='author image'
                                                fill
                                                className='shadow-xl rounded-full border object-cover'
                                                src={img3}
                                                sizes="65px"
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
                <h2 className='mx-5 my-3 font-semibold text-slate-700 text-sm text-center'>You must have to chose a Photo or Avatar</h2>

                <div className='flex flex-col sm:flex-row justify-center items-center gap-3 my-5'>
                    <div className='flex flex-col justify-center items-center gap-1'>
                        <Dialog>
                            <form>
                                <DialogTrigger asChild>
                                    <div className='flex flex-col justify-center items-center'>
                                        <div className='relative w-[70px] h-[70px] cursor-pointer flex justify-center items-center'>
                                            <Image
                                                alt='author image'
                                                fill
                                                className='shadow-xl rounded-full object-cover'
                                                src={avatar}
                                                sizes="70px"
                                            />
                                            <div className='absolute flex justify-center items-center rounded-full'>
                                                <div className='bg-gray-900 opacity-50 absolute rounded-full w-[70px] h-[70px]'>

                                                </div>
                                                <Image
                                                    alt='camera'
                                                    width={22}
                                                    height={22}
                                                    className='z-2 mt-8 opacity-90'
                                                    src='/images/logo/camera.png'
                                                />
                                            </div>
                                        </div>
                                        <h3 className='font-semibold text-gray-700 cursor-pointer'>Chose Avatar</h3>
                                    </div>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Profile Avatar</DialogTitle>
                                        <DialogDescription>
                                            Chose a avatar that match with your gender and also you like that to see as a profile picture.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="flex w-full max-w-sm flex-col gap-6">
                                        <Tabs defaultValue="all" onValueChange={(val) => handleGenderAvatar(val)} >
                                            <TabsList className='gap-4'>
                                                <TabsTrigger value="all">All</TabsTrigger>
                                                <TabsTrigger value="male">Male</TabsTrigger>
                                                <TabsTrigger value="female">Female</TabsTrigger>
                                            </TabsList>
                                            <TabsContent value="all">
                                                <div className='w-sm flex flex-wrap justify-center gap-3'>
                                                    {
                                                        avatarData.map(data => {
                                                            return (
                                                                <div key={data.id} className='relative w-[85px] h-[85px] cursor-pointer flex justify-center items-center'>
                                                                    <Image
                                                                        alt='avatar'
                                                                        fill
                                                                        className='shadow-lg rounded-full object-cover'
                                                                        src={data.link}
                                                                        sizes="85px"
                                                                    />
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </TabsContent>
                                            <TabsContent value="male">
                                                <div className='w-sm flex flex-wrap justify-center gap-3'>
                                                    {
                                                        avatarData.map(data => {
                                                            return (
                                                                <div key={data.id} className='relative w-[85px] h-[85px] cursor-pointer flex justify-center items-center'>
                                                                    <Image
                                                                        alt='avatar'
                                                                        fill
                                                                        className='shadow-xl rounded-full object-cover'
                                                                        src={data.link}
                                                                        sizes="85px"
                                                                    />
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </TabsContent>
                                            <TabsContent value="female">
                                                <div className='w-sm flex flex-wrap justify-center gap-3'>
                                                    {
                                                        avatarData.map(data => {
                                                            return (
                                                                <div key={data.id} className='relative w-[85px] h-[85px] cursor-pointer flex justify-center items-center'>
                                                                    <Image
                                                                        alt='avatar'
                                                                        fill
                                                                        className='shadow-xl rounded-full object-cover'
                                                                        src={data.link}
                                                                        sizes="85px"
                                                                    />
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </TabsContent>
                                        </Tabs>
                                    </div>
                                    <DialogFooter className='border-t pt-5 mt-2'>
                                        <DialogClose asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </DialogClose>
                                        <Button type="submit">Done</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </form>
                        </Dialog>

                    </div>
                    <div>
                        <div className='flex flex-col justify-center items-center'>
                            <div className='relative w-[50px] h-[50px] cursor-pointer flex justify-center items-center'>
                                <Image
                                    alt='author image'
                                    fill
                                    className='shadow-xl rounded-full object-cover'
                                    src={avatar}
                                    sizes="50px"
                                />
                            </div>
                        </div>
                        ------ or ------
                    </div>
                    <Label htmlFor="file-upload" className='flex flex-col justify-center items-center gap-1 cursor-pointer'>
                        <div className='relative w-[70px] h-[70px] flex justify-center items-center'>
                            <Image
                                alt='author image'
                                fill
                                className='shadow-xl rounded-full object-cover'
                                src={selectedFile ? URL.createObjectURL(selectedFile) : im}
                                sizes="70px"
                            />
                            <div className='absolute flex justify-center items-center rounded-full'>
                                <div className='bg-gray-900 opacity-50 absolute rounded-full w-[70px] h-[70px]'>

                                </div>
                                <Image
                                    alt='camera'
                                    width={22}
                                    height={22}
                                    className='z-2 mt-8 opacity-90'
                                    src='/images/logo/camera.png'
                                />
                            </div>
                        </div>
                        <h3 className='font-semibold text-gray-700'>Chose Photo</h3>
                        <Input
                            id="file-upload"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </Label>
                </div>

                {/* imputs section */}
                <form >
                    <div className='flex flex-col justify-center items-center px-5 py-4'>
                        <div className='w-full'>
                            <div className="">
                                <Label htmlFor="name" className='text-slate-700'>Name</Label>
                                <Input className='text-slate-700 mb-4 mt-2 bg-slate-50' type="text" id="name" placeholder="your name" readOnly required value='Abu Hasnat Nobin' />

                                <Label htmlFor="gender" className='text-slate-700'>Gender</Label>
                                <Select required>
                                    <SelectTrigger id='gender' className="w-full text-slate-700 mb-4 mt-2 bg-slate-50">
                                        <SelectValue placeholder="Select a fruit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>--- Select your gender ---</SelectLabel>
                                            <SelectItem value="Male">Male</SelectItem>
                                            <SelectItem value="Female">Female</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <Label htmlFor="title" className='text-slate-700'>Title / Occupation</Label>
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className="w-full text-slate-700 mb-4 mt-2 bg-slate-50 justify-between"
                                        >
                                            {value
                                                ? frameworks.find((framework) => framework.value === value)?.label
                                                : "Select your tittle / Occupation..."}
                                            <ChevronsUpDown className="opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                                        <Command>
                                            <CommandInput placeholder="Search framework..." className="h-9" />
                                            <CommandList className="max-h-[300px] overflow-y-auto">
                                                <CommandEmpty>No framework found.</CommandEmpty>
                                                <CommandGroup>
                                                    {frameworks.map((framework) => (
                                                        <CommandItem
                                                            key={framework.value}
                                                            value={framework.value}
                                                            onSelect={(currentValue) => {
                                                                setValue(currentValue === value ? "" : currentValue)
                                                                setOpen(false)
                                                            }}
                                                        >
                                                            {framework.label}
                                                            <Check
                                                                className={cn(
                                                                    "ml-auto",
                                                                    value === framework.value ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>

                                <Label htmlFor="bio">Your Bio</Label>
                                <Textarea required placeholder="Type your bio here." className='text-slate-700 mb-4 mt-2 bg-slate-50 text-lg' id="bio" />
                            </div>
                            <Button type='submit' className='bg-blue-800 rounded-sm w-full cursor-pointer hover:bg-blue-900'>Update</Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};