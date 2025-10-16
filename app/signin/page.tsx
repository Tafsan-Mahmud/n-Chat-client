'use client'
import Ppts from "@/components/ppts"
import logo from '@/public/images/logo/short-logo.png'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"
import Multibg from "@/components/multibg"
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2Icon } from "lucide-react"
import { SigninAuth } from "@/apis/handleSignin"
import { toast } from "sonner"

export default function Login() {
    const router = useRouter();
    const [showPass, setShowPass] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    }, []);


    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setIsClicked(true)
        const res = await SigninAuth(formData, router);
        // console.log(res);
        if (res.status === 'SUCCESS') {
            setIsClicked(false)
            toast(res.status, {
                style: {
                    color: "#22c55e"
                },
                description: res.message,
                richColors: true,
            });
        }
        if (res.status === "PROCESS!") {
            setIsClicked(false)
            toast(res.status, {
                style: {
                    color: "#c5a222ff"
                },
                description: res.message,
                richColors: true,
            });
        }
        if (res.status === 'ERROR!') {
            setIsClicked(false)
            toast(res.status, {
                style: {
                    color: "#f43f5e"
                },
                description: res.message,
                richColors: true,
            });
        }

    }, [formData, router]);

    return (
        <div className="min-h-screen relative flex flex-col">
            <Multibg />
            <div className="flex-grow flex flex-col items-center justify-center p-4">
                <Card className="w-full rounded-md max-w-sm shadow-none relative pt-12">
                    <form onSubmit={handleSubmit}>
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
                            <CardTitle className="text-2xl text-center mb-2">Sign In</CardTitle>
                            <CardDescription className="text-center">
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus, quam. Numquam eligendi soluta.
                            </CardDescription>
                        </CardHeader>
                        {/* Card Content (Form) */}
                        <CardContent>

                            <div className="flex flex-col gap-7">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
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
                                    <Input id="password" placeholder="Enter password"
                                        type={`${showPass ? 'text' : 'password'}`}
                                        required
                                        value={formData.password}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end mt-3">
                                <Link
                                    href="/forgotPass"
                                    className="text-sm underline-offset-4 hover:underline"
                                >
                                    Forgot your password?
                                </Link>

                            </div>

                        </CardContent>
                        {/* Card Footer (Button) */}
                        <CardFooter className="flex-col gap-2 mt-3">
                            <Button type="submit" disabled={isClicked} className="w-full cursor-pointer my-3 bg-blue-800 hover:bg-blue-900">
                                {
                                    isClicked ? <><Loader2Icon className="animate-spin" />
                                        Please wait..</> : 'Sign In'
                                }
                            </Button>
                        </CardFooter>
                        {/* "New User?" Section */}
                        <div className="text-center my-3 text-sm ">
                            <span><span className="text-neutral-400">New User?</span> <Link href={'/register'}>Create and account</Link></span>
                        </div>
                    </form>
                </Card>
                <Ppts />
            </div>
        </div>
    )
}