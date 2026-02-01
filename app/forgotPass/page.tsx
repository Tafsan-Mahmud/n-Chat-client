'use client';

import { useState } from 'react';
import { Loader2Icon, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import logo from '@/public/images/logo/logoName.png';
import Link from 'next/link';
import { uriAuth } from '@/public/apiuri/uri';

export default function ForgotPassPage() {
    const [email, setEmail] = useState('');
    const [REemail, setREEmail] = useState('');
    const [notMatch, setNotMatch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    const handleSubmit = async () => {
        if (email === REemail) {
            setLoading(true);
            setNotMatch(false);
            await fetch(`${uriAuth}/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ email }),
            });
            
            setDone(true);
            setLoading(false);
        } else {
            setNotMatch(true);
        }

    };

    return (
        <div className="relative w-full min-h-screen bg-[#f5f7fb] flex flex-col justify-center items-center">
            <Link href={'/chats'}>
                <div className='cursor-pointer absolute top-2 left-5 w-[150px] h-[80px]'>
                    <Image
                        alt='logo'
                        src={logo}
                    />
                </div>
            </Link>

            <Mail className="w-20 h-20 text-slate-400 mb-4" />

            {!done ? (
                <>
                    <h1 className="text-3xl font-semibold text-slate-700">
                        Forgot your password?
                    </h1>
                    <p className="text-slate-500 mt-3 mb-6">
                        Enter your email to receive a reset link
                    </p>

                    <div className="bg-[#ffffffbd] p-6 rounded-md w-[380px] border-2 border-white">
                        <Label>Email</Label>
                        <Input
                            type="email"
                            className="mt-2 mb-4"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                        />

                        <Label>Re-type Email</Label>
                        <Input
                            type="email"
                            className={`mt-2 ${notMatch ? 'border-red-600' : ''}`}
                            value={REemail}
                            onChange={(e) => setREEmail(e.target.value)}
                            placeholder="you@example.com"
                        />
                        {
                            notMatch && <p className='mt-1 text-red-600 text-xs'>Re-type email is not match!. please type correctly.</p>
                        }

                        <Button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full mt-7 bg-blue-800 hover:bg-blue-900"
                        >
                            {loading ? <><Loader2Icon className="animate-spin" />
                                Please wait..</> : 'Send reset link'}
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <h1 className="text-2xl font-semibold text-slate-700">
                        Check your email
                    </h1>
                    <p className="text-slate-500 mt-3 text-center">
                        If the email exists, a reset link has been sent.
                    </p>
                </>
            )}
        </div>
    );
}
