// app/authCreateAcc/page.tsx
"use client";

import React, { useState, useCallback, useMemo } from 'react';
import logo from '@/public/images/logo/short-logo.png'
import { Button } from "@/components/ui/button";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CountrySelect from "@/components/countrySelect"; // Corrected import
import Link from "next/link";
import Ppts from "@/components/ppts";
import Image from 'next/image';
import Multibg from '@/components/multibg';
import { CircleAlert, Eye, EyeOff } from 'lucide-react';
import { registerAuth } from '@/apis/handleRegister';
import { useRouter } from 'next/navigation';

// IMPORTANT: This interface MUST match the 'CountryOption' in your components/CountrySelect.tsx
interface SelectedCountryOption {
    value: string; // This is the COUNTRY NAME (e.g., "United States")
    label: string; // The displayed name (e.g., "United States (+1)")
    callCode: string; // This is the CALLING CODE (e.g., "1")
    id: string; // The unique ID
}

export default function Register() {
    const router = useRouter()
    const [showPass, setShowPass] = useState(false);
    const [showPassConfirm, setShowPassConfirm] = useState(false);
    const [confirmPassError, setConfirmPassError] = useState(false);
    const [countryError, setCountryError] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        country: '',
        password: '',
        confirmPassword: '',
    });

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    }, []);

    const handleCountryDropdownChange = useCallback((selectedOption: SelectedCountryOption | null) => {
        setFormData(prev => ({
            ...prev,
            country: selectedOption ? selectedOption.value : '',
        }));
        setCountryError(false)
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password === formData.confirmPassword) {
            if (formData.country === '') {
                setCountryError(true)
            } else {
                setCountryError(false)
                const res = await registerAuth(formData, router);
            }
            setConfirmPassError(false)
        } else {
            setConfirmPassError(true)
        }

    }, [formData, router]);
    const selectedCountryName = useMemo(() => formData.country, [formData.country]);

    return (
        <div className="min-h-screen relative flex flex-col">
            <Multibg />
            <div className="flex-grow flex flex-col items-center justify-center mt-10 p-4">
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
                    <form onSubmit={handleSubmit}>
                        <CardHeader>
                            <CardTitle className="text-2xl text-center ">Create Account</CardTitle>
                            <CardDescription className="text-center mb-6">
                                Lorem, ipsum dolor sit amet sdf amet eligendi soluta.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-5">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="Enter your name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="email">Email</Label>
                                    </div>
                                    <Input
                                        id="email"
                                        placeholder="Enter your email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="country">Country {countryError &&
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <CircleAlert className='text-red-500 w-4' />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Please select your Country</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        }</Label>
                                    </div>
                                    <CountrySelect
                                        err={countryError}
                                        value={selectedCountryName}
                                        onChange={handleCountryDropdownChange}
                                    />
                                </div>
                                <div className="relative grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                    </div>
                                    <div className='absolute bottom-[1px] right-1 rounded-tr-md rounded-br-md flex justify-center items-center  w-10 h-8 bg-white '>
                                        {
                                            showPass ?
                                                <EyeOff onClick={() => setShowPass(false)} className='w-5 text-slate-600 cursor-pointer' />
                                                :
                                                <Eye onClick={() => setShowPass(true)} className='w-5 text-slate-600 cursor-pointer' />
                                        }
                                    </div>
                                    <Input
                                        id="password"
                                        placeholder="Enter password"
                                        type={`${showPass ? 'text' : 'password'}`}
                                        required
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="relative grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Confirm Password {confirmPassError &&
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <CircleAlert className='text-red-500 w-4' />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Password does not match</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        }</Label>
                                    </div>
                                    <div className='absolute bottom-[1px] right-1 rounded-tr-md rounded-br-md flex justify-center items-center  w-10 h-8 bg-white '>
                                        {
                                            showPassConfirm ?
                                                <EyeOff onClick={() => setShowPassConfirm(false)} className='w-5 text-slate-600 cursor-pointer' />
                                                :
                                                <Eye onClick={() => setShowPassConfirm(true)} className='w-5 text-slate-600 cursor-pointer' />
                                        }
                                    </div>
                                    <Input
                                        className={`${confirmPassError && 'border-red-500 '}`}
                                        id="confirmPassword"
                                        placeholder="Confirm Password"
                                        type={`${showPassConfirm ? 'text' : 'password'}`}
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                        </CardContent>
                        <CardFooter className="flex-col gap-2 mt-8">
                            <Button type="submit" className="cursor-pointer w-full bg-blue-800 hover:bg-blue-900">
                                Create Account
                            </Button>
                        </CardFooter>
                    </form>
                    <div className="text-center my-3 text-sm">
                        <span><span className="text-neutral-400">Already have an account ?</span> <Link href={'/signin'}>Sign in instead</Link></span>
                    </div>
                </Card>
                <Ppts />
            </div>
        </div>
    );
}