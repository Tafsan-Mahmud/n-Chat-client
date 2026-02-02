"use client";

import { useEffect, useRef, useState } from "react";
import Ppts from "@/components/ppts";
import { Button } from "@/components/ui/button";
import logo from '@/public/images/logo/short-logo.png'
import LottieLoading from '../../components/lottitLoading';
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
import { OTPAuth } from "@/apis/handleOTP";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch } from "@/store";
import { setUser } from "@/store/userSlice";

export default function AuthOTP() {
    const otpInputRef = useRef<HTMLInputElement>(null);
    const [maskemail, setMaskEmail] = useState('')
    const [email, setEmail] = useState('')
    const [otpValue, setOtpValue] = useState("");
    const [otpError, setOtpError] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [uiLoader, setUiLoader] = useState(false);
    const router = useRouter();
    const x = email ? false : true;
    const dispatch = useAppDispatch();
    useEffect(() => {
        const mskeml = sessionStorage.getItem('resusrmailmsk') || '';
        const eml = sessionStorage.getItem('resusrmail') || '';
        setMaskEmail(mskeml);
        setEmail(eml)
        const timer = setTimeout(() => {
            if (otpInputRef.current) {
                otpInputRef.current.focus();
            }
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const handleOtpChange = (value: string) => {
        const numericValue = value.replace(/[^0-9]/g, '');
        setOtpValue(numericValue);
    };


    const handleVerify = async () => {
        if (otpValue.length === 6) {
            setOtpError(false);
            setIsClicked(true)
            const data = {
                otp: otpValue,
                email: email,
            };
            const response = await OTPAuth(data, router);

            if (response?.status === 429) {
                toast("Warning!", {
                    style: {
                        color: "#f43f5e"
                    },
                    description: response.message,
                    richColors: true,
                });
            }
            if (response.status === 'SUCCESS') {

                setUiLoader(true);
                toast(response.status, {
                    style: {
                        color: response.status === 'SUCCESS' ? "#22c55e" : "#f43f5e"
                    },
                    description: response.message,
                    richColors: true,
                });

                const { _id, email, name, active_Status, profile_image, title, bio } = response;
                const user = { _id, email, name, active_Status, profile_image, title, bio };
                dispatch(setUser(user));
                await new Promise(resolve => setTimeout(resolve, 1000));
                router.push('/chats');
            } else {
                setIsClicked(false)
                toast(response.status, {
                    style: {
                        color: `${response.status === 'SUCCESS' ? "#22c55e" : "#f43f5e"}`
                    },
                    description: response.message,
                    richColors: true,
                });
            }
        } else {
            setOtpError(true);
        }
    };

    return (
        <div className="min-h-screen relative flex flex-col">
            <Multibg />
            {
                uiLoader ? <>
                    <div className="flex justify-center items-center h-screen">
                        <LottieLoading />
                    </div></> :

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
                                        <Label className="text-muted-foreground" htmlFor="option-one">{maskemail}</Label>
                                    </div>
                                </RadioGroup>
                                <div className="flex justify-center mt-10 mb-5">
                                    <Label className="text-neutral-600" htmlFor="tabs-demo-current">Please Enter 6 Digit OTP</Label>
                                </div>
                                <div className="mt-2" >
                                    <InputOTP
                                        maxLength={6}
                                        className="w-full justify-between"
                                        id="tabs-demo-current"
                                        ref={otpInputRef}
                                        value={otpValue}
                                        onChange={handleOtpChange}
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
                                    {
                                        otpError && <p className="text-red-600 text-sm mt-3">Please enter the complete 6-digit OTP!</p>
                                    }
                                </div>
                            </CardContent>
                            <CardFooter className="flex-col gap-2 mt-3">
                                <Button onClick={handleVerify} disabled={isClicked || x} className="w-full cursor-pointer bg-blue-800 hover:bg-blue-900">
                                    {
                                        isClicked ? <><Loader2Icon className="animate-spin" />
                                            Please wait..</> : 'Verify'
                                    }
                                </Button>
                                <div className="flex justify-start w-full">
                                    <p className='mt-3 cursor-pointer underline text-slate-500'>Resend OTP</p>
                                </div>
                            </CardFooter>
                        </Card>
                        <Ppts />
                    </div>
            }
        </div>
    );
}