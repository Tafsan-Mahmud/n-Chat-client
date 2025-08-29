"use client";

import { useEffect, useRef } from "react";
import Ppts from "@/components/ppts";
import { Button } from "@/components/ui/button";
import logo from '@/public/images/logo/short-logo.png'
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import Multibg from "@/components/multibg";

export default function AuthOTP() {
    const otpInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (otpInputRef.current) {
                otpInputRef.current.focus();
            }
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Multibg />
            <div className="flex-grow flex flex-col items-center justify-center p-4">
                <Card className="w-full rounded-md max-w-sm shadow-none relative pt-12">
                    <div
                        className="absolute -top-10 left-1/2 -translate-x-1/2 w-17 h-17 rounded-full flex items-center justify-center overflow-hidden">
                        <div className='cursor-pointer w-[150px] h-[80px]'>
                            <Image
                                alt='logo'
                                src={logo}
                            />
                        </div>
                    </div>
                    {/* Card Header */}
                    <CardHeader>
                        <CardTitle className="text-2xl text-center mb-2 text-neutral-600">Verify OTP</CardTitle>
                        <CardDescription className="text-center py-3 mb-3 px-2 bg-neutral-100 rounded font-semibold text-sm text-neutral-600">
                            OTP Required, OTP send on your registered email
                        </CardDescription>
                    </CardHeader>
                    {/* Card Content (Form) */}
                    <CardContent>
                        <RadioGroup defaultValue="option-one">
                            <div className="flex items-center space-x-3">
                                <RadioGroupItem value="option-one" id="option-one" />
                                <Label className="text-muted-foreground" htmlFor="option-one">gsmclas*******@gmail.com</Label>
                            </div>
                        </RadioGroup>
                        <div className="flex justify-center mt-10 mb-5">
                            <Label className="text-neutral-600" htmlFor="tabs-demo-current">Please Enter 6 Digit OTP</Label>
                        </div>
                        <div className="mt-2" >
                            {/* Attach the ref to the main InputOTP component for programmatic focus.
                                Apply w-full and justify-between to ensure it spans the width and spaces slots. */}
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
                    </CardContent>
                    <CardFooter className="flex-col gap-2 mt-3">
                        <Button type="submit" className="w-full cursor-pointer bg-blue-800 hover:bg-blue-900">
                            Verify
                        </Button>
                        <div className="flex justify-start w-full">
                            <p className='mt-3 cursor-pointer underline text-slate-500'>Resend OTP</p>
                        </div>
                    </CardFooter>
                </Card>
                <Ppts />
            </div>
        </div>
    );
}