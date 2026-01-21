'use client'
import React, { useState } from 'react';
import { ChevronLeft, Check, ChevronsUpDown, CircleAlert } from 'lucide-react';
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
const img1 = 'https://i.ibb.co/NdHTBW2v/hero-4.jpg'
const img2 = 'https://i.ibb.co/KjNsdBwY/hero-3.jpg'
const img3 = 'https://i.ibb.co/vxFCjXvm/hero-2.jpg'
const avatar = 'https://i.ibb.co/F4dr8xh7/thumb-girl.jpg'
const preview = 'https://i.ibb.co/20knMBVT/avatar.jpg'
const im = 'https://yt3.ggpht.com/m0a6GCrPDK4HpJ5OylPjISR7rRmJKYqk2FbHr4lvu2yQKrBMWaIK4z3JVcqe7KcAIllbz8EGVfA=s88-c-k-c0x00ffffff-no-rj';

import { avatarJSON } from '@/public/avatarJSon/avatar';
import { updateUserProfile } from '@/apis/userActions/updateProfile';

const tittle = [
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

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");

    const [ttlError, setTtlError] = useState('');
    const [bioError, setBioError] = useState('');
    const [profileError, setProfileError] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const [isClicked, setClicked] = useState(false);

    const [selectedAvatarId, setSelectedAvatarId] = useState(null);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [avatarData, setAvatarData] = useState(avatarJSON);

    const [formData, setFormData] = useState({
        tittle: '',
        bio: '',
    });

    const handleInputChange = (e) => {
        setBioError('')
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleTittleSelect = (newTittleValue) => {
        setTtlError('')
        setFormData(prev => ({ ...prev, tittle: newTittleValue }));
    };
    const handleGenderAvatar = (gender) => {
        setSelectedAvatarId(null)
        setSelectedAvatar("")
        if (gender === 'all') {
            setAvatarData(avatarJSON)
        } else {
            const filter = avatarJSON.filter(x => x.gender == gender)
            setAvatarData(filter)
        }
    }

    const handleSelectAvatar = (id, link) => {
        setSelectedAvatarId(id)
        setSelectedAvatar(link)
        setProfileError(false)

    }
    const handleDialogAction = (x, y) => {
        if (x == false && y == true) {
            setSelectedFile(null)
            setIsOpen(false);
        } else {
            setSelectedAvatar(null);
            setSelectedAvatarId(null);
            setIsOpen(false);
        }
    }

    const handleFileChange = (event) => {

        const file = event.target.files[0];
        if (file) {
            setProfileError(false)
            setSelectedAvatar(null);
            setSelectedAvatarId(null);
            setSelectedFile(file);
        }

    };

    const handleUpdateInfo = async (e) => {
        e.preventDefault();
        if (!selectedAvatar || !selectedFile) {
            setProfileError(true);
        }
        if (formData.tittle === '') {
            setTtlError('Please select Title / Occupation')
        } else {
            setTtlError('')
        }
        if (formData.bio === '') {
            setBioError('please add some bio')
        } else {
            setBioError('')
        }
        const data = new FormData();

        data.append('title', formData.tittle);
        data.append('bio', formData.bio);

        if (selectedFile) {
            data.append('image', selectedFile);
        }
        if (!selectedFile && selectedAvatar) {
            data.append('avatarUrl', selectedAvatar);
        }
        if (selectedAvatar || selectedFile && formData.tittle && formData.bio) {
            try {
                const response = await updateUserProfile(data);

                // success handling
                console.log(response);
                // router.push('/chats');

            } catch (err) {
                console.error(err);
                setProfileError(err.message || 'Something went wrong');
            }
        } 
    }
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

                {profileError &&
                    <h2 className='mx-5 my-3 font-semibold text-red-600 text-sm text-center'>Warning : You must have to chose a Photo or Avatar!</h2>
                }

                <div className='flex flex-col sm:flex-row justify-center items-center gap-8 my-5'>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild >
                            <div className='flex flex-col justify-center items-center gap-2'>
                                <div className='relative w-[70px] h-[70px] cursor-pointer flex justify-center items-center'>
                                    <Image
                                        alt='author image'
                                        fill
                                        className='shadow-xl rounded-full object-cover'
                                        src={selectedAvatar ? selectedAvatar : avatar}
                                        sizes="70px"
                                    />
                                    <div className='absolute flex flex-col justify-center items-center w-[70px] h-[70px] rounded-full'>
                                        <div className='absolute bg-gray-900 opacity-50 rounded-full w-full h-full'></div>
                                        <Image
                                            alt='camera'
                                            width={22}
                                            height={22}
                                            className='opacity-90 z-10 mt-5 w-7 h-6'
                                            src='/images/logo/camera.png'
                                        />
                                    </div>
                                </div>
                                <h3 className='font-semibold text-sm text-gray-700'>Chose Avatar</h3>
                            </div>
                        </DialogTrigger>
                        <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
                            <DialogHeader >
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
                                        <div className='w-sm flex flex-wrap justify-center gap-2'>
                                            {
                                                avatarData.map((data, i) => {
                                                    return (
                                                        <div onClick={() => handleSelectAvatar(i + 1, data.link)} key={data.id} className={`relative w-[90px] h-[90px] cursor-pointer flex justify-center items-center border-4
                                                                 ${selectedAvatarId == i + 1 ? 'border-green-500' : 'border-white'} rounded-full`}>
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
                                                avatarData.map((data, i) => {
                                                    return (
                                                        <div onClick={() => handleSelectAvatar(i + 1, data.link)} key={data.id} className={`relative w-[90px] h-[90px] cursor-pointer flex justify-center items-center border-4
                                                                 ${selectedAvatarId == i + 1 ? 'border-green-500' : 'border-white'} rounded-full`}>
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
                                    <TabsContent value="female">
                                        <div className='w-sm flex flex-wrap justify-center gap-3'>
                                            {
                                                avatarData.map((data, i) => {
                                                    return (
                                                        <div onClick={() => handleSelectAvatar(i + 1, data.link)} key={data.id} className={`relative w-[90px] h-[90px] cursor-pointer flex justify-center items-center border-4
                                                                 ${selectedAvatarId == i + 1 ? 'border-green-500' : 'border-white'} rounded-full`}>
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
                                </Tabs>
                            </div>
                            <DialogFooter className='border-t pt-5 mt-2'>
                                <Button onClick={() => selectedAvatar ? handleDialogAction(false, false) : handleDialogAction(false,)} variant="outline">Cancel</Button>
                                <Button onClick={() => selectedAvatar ? handleDialogAction(false, true) : ''} className='bg-blue-800 cursor-pointer hover:bg-blue-700'>Done</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <div>
                        <div className='flex flex-col justify-center items-center'>
                            <div className='relative w-[50px] h-[50px] cursor-pointer flex justify-center items-center'>
                                {(selectedFile || selectedAvatar || avatar) && (
                                    <Image
                                        alt='author image'
                                        fill
                                        className='shadow-md rounded-full object-cover'
                                        sizes="50px"
                                        src={
                                            selectedFile
                                                ? URL.createObjectURL(selectedFile)
                                                : selectedAvatar
                                                    ? selectedAvatar
                                                    : preview
                                        }
                                    />
                                )}
                            </div>
                        </div>
                        {
                            selectedAvatar ? (
                                <span className='text-xs font-semibold text-slate-600'>Selected</span>
                            ) : selectedFile ? (
                                <span className='text-xs font-semibold text-green-600'>Selected</span>
                            ) : (
                                <div className="relative my-5 flex items-center justify-center w-30">
                                    <div className="w-full h-[1px] bg-gray-500"></div>
                                    <span className="absolute mb-1 h-5 font-semibold rounded-full flex justify-center items-center overflow-hidden p-1 bg-slate-50 text-gray-600"> or </span>
                                </div>
                            )
                        }

                    </div>
                    <Label htmlFor="file-upload" className='flex flex-col justify-center items-center gap-2.5 cursor-pointer'>
                        <div className='relative w-[70px] h-[70px] flex justify-center items-center'>
                            <Image
                                alt='preview'
                                fill
                                className='shadow-xl rounded-full object-cover'
                                src={selectedFile ? URL.createObjectURL(selectedFile) : im}
                                sizes="70px"
                            />
                            <div className='absolute flex flex-col justify-center items-center w-[70px] h-[70px] rounded-full'>
                                <div className='absolute bg-gray-900 opacity-50 rounded-full w-full h-full'></div>
                                <Image
                                    alt='camera'
                                    width={20}
                                    height={10}
                                    className='opacity-90 z-10 mt-5 w-7 h-6'
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
                <div className='flex flex-col justify-center items-center px-5 py-4'>
                    <div className='w-full'>
                        <div className="">
                            <Label htmlFor="name" className='text-slate-700'>Name - <span className='text-gray-400 font-normal'>( not editable right now! )</span></Label>
                            <Input className='text-slate-700 mb-4 mt-2 bg-slate-50' type="text" id="name" placeholder="your name" readOnly required value='Abu Hasnat Nobin' />
                            <Label htmlFor="title" className='text-slate-700'>Title / Occupation
                                {
                                    ttlError &&
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <CircleAlert className='text-red-500 w-4' />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{ttlError}</p>
                                        </TooltipContent>
                                    </Tooltip>

                                }</Label>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className={`${ttlError ? 'border-red-500' : ''} w-full text-slate-700 mb-4 mt-2 bg-slate-50 justify-between`}
                                    >
                                        {value
                                            ? tittle.find((tittle) => tittle.value === value)?.label
                                            : <span className='text-gray-400'>Select your tittle / Occupation...</span>}
                                        <ChevronsUpDown className="opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search tittle / Occupation...." className="h-9" />
                                        <CommandList className="max-h-[300px] overflow-y-auto">
                                            <CommandEmpty>No title / Occupation. found.</CommandEmpty>
                                            <CommandGroup>
                                                {tittle.map((data) => (
                                                    <CommandItem
                                                        key={data.value}
                                                        value={data.value}
                                                        onSelect={(currentValue) => {

                                                            const newValue = currentValue === formData.tittle ? "" : currentValue;
                                                            setValue(newValue);
                                                            handleTittleSelect(newValue);
                                                            setOpen(false);
                                                        }}
                                                    >
                                                        {data.label}
                                                        <Check
                                                            className={cn(
                                                                "ml-auto",
                                                                value === data.value ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>

                            <Label htmlFor="bio">Your Bio
                                {
                                    bioError &&
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <CircleAlert className='text-red-500 w-4' />
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{bioError}</p>
                                        </TooltipContent>
                                    </Tooltip>

                                }</Label>
                            <Textarea required placeholder="Type your bio here." className={`${bioError ? 'border-red-500' : ''} text-slate-700 mb-4 mt-2 bg-slate-50 text-lg`} id="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                            />
                        </div>
                        <Button onClick={handleUpdateInfo} disabled={isClicked} type="submit" className="cursor-pointer w-full bg-blue-800 hover:bg-blue-900">
                            {
                                isClicked ? <><Loader2Icon className="animate-spin" />
                                    Please wait..</> : 'Update'
                            }
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};