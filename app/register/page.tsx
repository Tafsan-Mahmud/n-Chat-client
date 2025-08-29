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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CountrySelect from "@/components/countrySelect"; // Corrected import
import Link from "next/link";
import Ppts from "@/components/ppts";
import Image from 'next/image';
import Multibg from '@/components/multibg';

// IMPORTANT: This interface MUST match the 'CountryOption' in your components/CountrySelect.tsx
interface SelectedCountryOption {
    value: string; // This is the COUNTRY NAME (e.g., "United States")
    label: string; // The displayed name (e.g., "United States (+1)")
    callCode: string; // This is the CALLING CODE (e.g., "1")
    id: string; // The unique ID
}

export default function AuthCreateAcc() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        callCode: '93',
        country: 'Afghanistan', // This will store the country NAME string (e.g., "United States")
        mobile: '',
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
            country: selectedOption ? selectedOption.value : '', // Store the COUNTRY NAME
            callCode: selectedOption ? selectedOption.callCode : '', // Store the CALLING CODE
        }));
    }, []);

    const handleMobileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormData(prev => ({ ...prev, mobile: value }));
    }, []);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        // Add your form submission logic here (e.g., API call)
    }, [formData]);

    // The 'value' for CountrySelect is now just the country name string
    const selectedCountryName = useMemo(() => formData.country, [formData.country]);

    return (
        <div className="min-h-screen flex flex-col">
            <Multibg/>
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
                    <CardHeader>
                        <CardTitle className="text-2xl text-center ">Create Account</CardTitle>
                        <CardDescription className="text-center">
                            Lorem, ipsum dolor sit amet sdf amet eligendi soluta.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-5">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="enter your name"
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
                                        placeholder="m@example.com"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="country">Country</Label>
                                    </div>
                                    <CountrySelect
                                        value={selectedCountryName}
                                        onChange={handleCountryDropdownChange}
                                    />
                                </div>
                                <div className="grid gap-2 relative">
                                    <div className="flex items-center">
                                        <Label htmlFor="mobile">Mobile</Label>
                                    </div>
                                    {formData.callCode && <div className='absolute bottom-0.5 left-0.5 bg-[#ffffff]  px-3 py-1 border-r rounded-tl-md rounded-bl-md'>
                                        +{formData.callCode}
                                    </div>}
                                    <Input
                                        className={formData.country ? 'pl-17' : ''}
                                        id="mobile"
                                        placeholder="enter your number"
                                        type="number"
                                        required
                                        value={formData.mobile}
                                        onChange={handleMobileInputChange}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                    </div>
                                    <Input
                                        id="password"
                                        placeholder="enter password"
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex-col gap-2 mt-3">
                        <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-900">
                            Create Account
                        </Button>
                    </CardFooter>
                    <div className="text-center my-3 text-sm">
                        <span><span className="text-neutral-400">Already have an account ?</span> <Link href={'/authSignIn'}>Sign in instead</Link></span>
                    </div>
                </Card>
                <Ppts />
            </div>
        </div>
    );
}