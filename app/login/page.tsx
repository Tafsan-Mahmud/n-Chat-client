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

export default function CardDemo() {
    return (
        <div className="min-h-screen flex flex-col">
            <Multibg/>
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
                        <CardTitle className="text-2xl text-center mb-">Sign In</CardTitle>
                        <CardDescription className="text-center">
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus, quam. Numquam eligendi soluta.
                        </CardDescription>
                    </CardHeader>
                    {/* Card Content (Form) */}
                    <CardContent>
                        <form>
                            <div className="flex flex-col gap-7">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                    </div>
                                    <Input id="password" placeholder="enter password" type="password" required />
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    {/* Card Footer (Button) */}
                    <CardFooter className="flex-col gap-2 mt-3">
                        <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-900">
                            Sign In
                        </Button>
                    </CardFooter>
                    {/* "New User?" Section */}
                    <div className="text-center my-3 text-sm ">
                        <span><span className="text-neutral-400">New User?</span> <Link href={'/authCreateAcc'}>Create and account</Link></span>
                    </div>
                </Card>
                <Ppts />
            </div>
        </div>
    )
}