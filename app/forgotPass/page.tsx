'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Mail, ServerCog } from 'lucide-react';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import logo from '../../public/images/logo/logoName.png'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const Page = () => {
    const router = useRouter();
    const [tglUi, setTglUi] = useState(true);
    const otpInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (otpInputRef.current) {
                otpInputRef.current.focus();
            }
        }, 100);
        return () => clearTimeout(timer);
    }, [tglUi]);
    return (
        <div className='relative w-full min-h-screen bg-slate-50 flex flex-col justify-center items-center'>
            <Link href={'/chats'}>
            <div className='cursor-pointer absolute top-2 left-5 w-[150px] h-[80px]'>
                <Image
                    alt='logo'
                    src={logo}
                />
            </div>
            </Link>
            {
                tglUi ?
                    <Mail className='w-25 h-25 text-slate-500' /> : <ServerCog className='w-25 h-25 text-slate-500' />
            }
            {
                tglUi ? <><h1 className='text-4xl text-center font-semibold text-slate-600 mt-6'>Forgot your password?</h1>
                    <p className='mt-5 text-slate-500 '>Enter your email here, we will send you a OTP for change password</p></> : <><h1 className='text-4xl text-center font-semibold text-slate-600 mt-6'>Enter The OTP</h1>
                    <p className='mt-5 text-slate-500 '>Enter 6 digit OTP that we sent to your email check mail </p></>
            }
            <div className='w-[24%] mt-7 py-8 px-6  bg-white rounded-md'>
                {
                    tglUi &&
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" className="w-full mt-2 bg-white mb-5" id="email" placeholder="enter email address" />
                        <Label htmlFor="email">Re-enter Email</Label>
                        <Input type="email" className="w-full mt-2 bg-white" id="email" placeholder="re-enter email address" />
                        <Button onClick={() => setTglUi(false)} className="bg-blue-800 mt-5 w-full hover:bg-blue-900 cursor-pointer">Submit</Button>
                    </div>
                }
                {
                    !tglUi &&
                    <div>
                        <div className="mt-" >
                            <InputOTP
                                maxLength={6}
                                className="w-full justify-between"
                                id="tabs-demo-current"
                                ref={otpInputRef}
                            >
                                <InputOTPGroup className="w-full justify-between">
                                    <InputOTPSlot className="rounded-sm w-12 h-12 text-lg" index={0} />
                                    <InputOTPSlot className="border rounded-sm w-12 h-12 text-lg" index={1} />
                                    <InputOTPSlot className="border rounded-sm w-12 h-12 text-lg" index={2} />
                                    <InputOTPSlot className="border rounded-sm w-12 h-12 text-lg" index={3} />
                                    <InputOTPSlot className="border rounded-sm w-12 h-12 text-lg" index={4} />
                                    <InputOTPSlot className="border rounded-sm w-12 h-12 text-lg" index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>
                        <Button onClick={() => setTglUi(true)} className="bg-blue-800 mt-10 w-full hover:bg-blue-900 cursor-pointer">Verify</Button>
                        <p className='mt-3 cursor-pointer underline text-slate-500'>Resend OTP</p>
                    </div>
                }
            </div>
            <p></p>
        </div>
    );
};

export default Page;

