'use client'
import React, { use, useEffect, useState } from 'react';
import { BellRing, MonitorDot, Settings, SunMoon, Image as Photo, ShieldQuestionMark, TriangleAlert, FileSpreadsheet, ContactRound, DoorClosedLocked, Heart, Cpu, LogOut, Loader2Icon, Volume2 } from 'lucide-react';
import Image from 'next/image';
import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
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
import { logOut } from "@/apis/logOut";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/store';
import { toast } from 'sonner';
import { Skeleton } from "@/components/ui/skeleton"
const im = 'https://yt3.ggpht.com/yti/ANjgQV_53OCUJNvxFfI_hbBWcFPzQRqcF6YZK-CcsvyPKXX4hho=s88-c-k-c0x00ffffff-no-rj';
const AuthorSec = () => {
    const router = useRouter();
    const user = useAppSelector((s) => s.user?.data);
    // const user = false
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const handleLogout = async () => {
        if (loading) return;
        setLoading(true);

        const res = await logOut();

        if (res.success) {
            toast.success("Logout Successful", {
                description: res.message,
            });
            setTimeout(() => {
                router.push("/signin")
            }, 700);
        } else {
            setLoading(false);
            toast.error("Logout Failed", {
                description: res.message || "Something went wrong.",
            });
        }
    };


    return (
        <div>
            {/* <h4 className='px-8 py-3 text-xl font-semibold text-blue-800 text-center border-b mb-2'>NChat</h4> */}
            <div className='pb-7 mt-4 px-8 flex items-center gap-3'>
                <div className="relative w-[90px] aspect-square rounded-full overflow-hidden flex-shrink-0 select-none">
                    {!loaded && (
                        <Skeleton className="w-full h-full rounded-full bg-slate-200" />
                    )}
                    {user?.profile_image && (
                        <Image
                            src={user.profile_image}
                            alt="User profile"
                            fill
                            sizes="90px"
                            className={`object-cover transition-opacity duration-200 ${loaded ? "opacity-100" : "opacity-0"
                                }`}
                            onLoad={() => setLoaded(true)}
                            loading="lazy"
                        />
                    )}
                </div>
                <div className='flex w-full justify-between'>
                    <div>
                        {user ? (
                            <>
                                <p className="text-xl font-semibold text-slate-700">
                                    {user.name}
                                    <span className="text-sm text-blue-800 cursor-pointer select-none">
                                        {" "}@NChat
                                    </span>
                                </p>
                                <p className="text-md text-slate-600">
                                    {user.title}
                                </p>
                            </>
                        ) : (
                            <>
                                <Skeleton className="h-5 w-60 mb-3 bg-slate-200" />
                                <Skeleton className="h-3 w-40 bg-slate-200" />
                            </>
                        )}
                    </div>
                    <div className='flex items-center border-l pl-2'>
                        <Sheet>
                            <SheetTrigger>
                                <Settings className='text-slate-600 cursor-pointer hover:bg-slate-200 p-2 w-10 h-10 rounded-full transition-colors duration-250' />
                            </SheetTrigger>
                            <SheetContent side='left' className="pb-10 bg-slate-100 min-w-[25%] flex-1 overflow-y-auto h-full custom-scrollbar-drawer">
                                <SheetTitle className="text-center my-3 mx-8 text-lg pb-2 border-b">Settings</SheetTitle>
                                <div className='flex justify-center'>
                                    <div className="relative w-[100px] aspect-square rounded-full overflow-hidden flex-shrink-0 select-none">

                                        {!loaded && (
                                            <Skeleton className="w-full h-full rounded-full bg-slate-200" />
                                        )}
                                        {user?.profile_image && (
                                            <Image
                                                src={user.profile_image}
                                                alt="User profile"
                                                fill
                                                sizes="100px"
                                                className={`object-cover transition-opacity duration-200 ${loaded ? "opacity-100" : "opacity-0"
                                                    }`}
                                                onLoadingComplete={() => setLoaded(true)}
                                                loading="lazy"
                                            />
                                        )}
                                    </div>
                                </div>
                                <div className="text-center mb-4">
                                    {user ? (
                                        <>
                                            <p className="text-2xl font-semibold text-slate-800">
                                                {user.name}
                                            </p>
                                            <p className="text-sm text-slate-600">
                                                {user.title}
                                            </p>
                                        </>
                                    ) : (
                                        <>
                                            <Skeleton className="h-7 w-48 mx-auto mb-2" />
                                            <Skeleton className="h-4 w-36 mx-auto" />
                                        </>
                                    )}
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
                                            <div className='flex text-slate-600 p-2 gap-3 cursor-pointer hover:bg-slate-200 rounded'>
                                                <div><BellRing /></div>
                                                <p className='w-full pb-3 border-b font-semibold'>Notification & Sound</p>
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
                                        <div className='rounded-lg p-2 bg-slate-50 hover:bg-slate-200'>
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
                                <div className='mx-4'>
                                    <Dialog>
                                        <h5 className='text-lg font-semibold text-slate-600 mt-2 mb-2'>System</h5>
                                        <div className='rounded-lg p-2 bg-slate-50'>
                                            <div className='w-full '>
                                                <div className='flex text-slate-600 p-2 gap-3 cursor-pointer hover:bg-slate-200 rounded'>
                                                    <div><Cpu /></div>
                                                    <p className='w-full pb-3 border-b font-semibold'>About</p>
                                                </div>
                                            </div>
                                            <div className='w-full '>
                                                <DialogTrigger asChild>
                                                    <div className='flex text-slate-600 p-2 gap-3 cursor-pointer hover:bg-slate-200 rounded'>
                                                        <div className='text-red-500'><LogOut /></div>
                                                        <p className='text-red-500 w-full pb-3 border-b font-semibold'>Logout</p>
                                                    </div>
                                                </DialogTrigger>

                                            </div>
                                        </div>

                                        <DialogContent className="sm:max-w-[425px]">
                                            <DialogHeader>
                                                <DialogTitle>Are you Sure?</DialogTitle>
                                                <DialogDescription>
                                                    Do you want to logout from 'NChat'. if yes then click 'Logout' button, if not then click 'cancle'
                                                </DialogDescription>
                                            </DialogHeader>
                                            <DialogFooter>
                                                <DialogClose asChild>
                                                    <Button variant="outline">Cancel</Button>
                                                </DialogClose>
                                                <Button onClick={handleLogout} disabled={loading} className='bg-red-500 text-gray-100 hover:bg-red-600 cursor-pointer'>
                                                    {
                                                        loading ? <><Loader2Icon className="animate-spin" />
                                                            Please wait..</> : 'Yes, LogOut'
                                                    }</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
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