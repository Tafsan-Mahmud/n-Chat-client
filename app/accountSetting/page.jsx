'use client'

import { ChevronLeft, Camera, CloudUpload, Loader2Icon, Eye, EyeOff, Check, ChevronsUpDown } from 'lucide-react'
import React, { useState, useCallback, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAppSelector } from "@/store"
import { motion } from "framer-motion"
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
import logo from '../../public/images/logo/logoName.png'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from '@/lib/utils'

export default function Page() {

  const user = useAppSelector((s) => s.user?.data)

  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [topBarImage, setTopBarImage] = useState('')
  const [imageError, setImageError] = useState("")
  const [imgLoaded, setImgLoaded] = useState(false)
  const [isPersonalLoading, setIsPersonalLoading] = useState(false)
  const [isPasswordLoading, setIsPasswordLoading] = useState(false)

  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false
  })
  const [personalError, setPersonalError] = useState({
    name: "",
    title: "",
    bio: ""
  })
  const [personalData, setPersonalData] = useState({
    name: "",
    title: "",
    bio: ""
  });

  const title = [
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

  useEffect(() => {
    if (user) {
      setPreview(user.profile_image);
      setValue(user.title)
      setTopBarImage(user.profile_image);
      setPersonalData({
        name: user.name || "",
        title: user.title || "",
        bio: user.bio || ""
      })
    }
  }, [user]);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [passwordError, setPasswordError] = useState("")

  const checks = {
    length: passwordData.newPassword.length >= 8,
    upper: /[A-Z]/.test(passwordData.newPassword),
    number: /[0-9]/.test(passwordData.newPassword),
    special: /[^A-Za-z0-9]/.test(passwordData.newPassword)
  };

  const isPasswordEmpty = !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword;

  const handlePersonalChange = useCallback((e) => {
    const { id, value } = e.target
    setPersonalData(prev => ({ ...prev, [id]: value }))
    setPersonalError(prev => ({ ...prev, [id]: "" }))
  }, [])

  const handleTitleSelect = (newTitleValue) => {
    setPersonalData(prev => ({ ...prev, title: newTitleValue }));
    setPersonalError(prev => ({ ...prev, title: "" }));
  };
  const handlePasswordChange = useCallback((e) => {
    const { id, value } = e.target
    setPasswordData(prev => ({ ...prev, [id]: value }))
  }, [])

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const allowed = ["image/jpeg", "image/jpg", "image/png"]

    if (!allowed.includes(file.type)) {
      setImageError("Only JPG, JPEG, PNG files allowed")
      return;
    }

    setImageError("");
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  }

  const isPersonalChanged =
    personalData.name !== (user?.name || "") ||
    personalData.title !== (user?.title || "") ||
    personalData.bio !== (user?.bio || "") ||
    selectedFile !== null

  const handlePersonalSubmit = async () => {

    let errors = {
      name: "",
      title: "",
      bio: ""
    }

    let hasError = false

    if (!personalData.name.trim()) {
      errors.name = "Name is required"
      hasError = true
    }

    if (!personalData.title.trim()) {
      errors.title = "Title is required"
      hasError = true
    }

    if (!personalData.bio.trim()) {
      errors.bio = "Bio is required"
      hasError = true
    }

    setPersonalError(errors)

    if (hasError) return

    setIsPersonalLoading(true)
    await new Promise(res => setTimeout(res, 1500))
    setIsPersonalLoading(false)
  }

  const handlePasswordSubmit = async () => {

    if (!passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword) {

      setPasswordError("All password fields are required.")
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("New password and confirm password do not match.")
      return;
    }

    if (!checks.length || !checks.upper || !checks.number || !checks.special) {
      setPasswordError("Password is too weak, please enter strong password!")
      return;
    }
    setPasswordError("")
    setIsPasswordLoading(true)
    await new Promise(res => setTimeout(res, 1500))
    setIsPasswordLoading(false)
  }

  return (

    <div className="min-h-screen bg-slate-100">

      {/* Navbar */}

      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-1 flex flex-wrap gap-3 justify-between items-center">

          <Link href="/chats">
            <Image alt="logo" src={logo} className="w-28 cursor-pointer" />
          </Link>

          <div className="flex items-center gap-3 flex-wrap justify-end">

            <Link
              href="/chats"
              className="flex items-center gap-2 text-sm text-blue-800 font-medium bg-blue-100 hover:bg-blue-200 px-3 py-2 rounded-md whitespace-nowrap"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Chats
            </Link>

            <div className="w-12 h-12 relative shrink-0">
              {!imgLoaded && (
                <Skeleton className="absolute inset-0 rounded-full bg-slate-200" />
              )}

              {topBarImage && (
                <Image
                  src={topBarImage}
                  alt="profile"
                  fill
                  onLoad={() => setImgLoaded(true)}
                  className="rounded-full object-cover border"
                />
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Cards Container */}

      <div className="max-w-6xl mx-auto px-4 mt-6 flex flex-col lg:flex-row items-center lg:items-stretch justify-center lg:justify-around gap-8 pb-8">

        {/* PERSONAL */}

        <div className="bg-white rounded-xl border w-full max-w-lg flex flex-col">

          <div className="flex items-center gap-3 px-6 py-3 border-b">
            <div className="w-[3px] h-5 bg-blue-800 rounded"></div>
            <h3 className="font-semibold text-lg">Personal Information</h3>
          </div>

          <div className="p-5 pt-3 flex flex-col flex-1">

            {/* IMAGE UPLOAD */}
            <div className="flex flex-col items-center mb-4.5 gap-2.5">

              <label htmlFor="file-input" className="relative group cursor-pointer">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border">
                  {!imgLoaded ? (
                    <Skeleton className="w-full h-full rounded-full bg-slate-200" />
                  ) : (
                    <Image
                      src={preview}
                      fill
                      alt="avatar"
                      className="object-cover shadow-sm"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
              </label>

              {
                imgLoaded ? <label
                htmlFor="file-input"
                className="group flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-100 text-blue-800 cursor-pointer transition hover:bg-blue-200 font-medium text-sm"
              >
                <CloudUpload className="w-5 h-5 group-hover:-translate-y-1 transition" />
                Change photo
              </label> : <Skeleton className="w-35 h-8 bg-slate-200" />
              }

              {imageError && <p className="text-red-500 text-sm">{imageError}</p>}

              <input id="file-input" type="file" className="hidden" onChange={handleFileChange} />
            </div>
            {
              topBarImage ? (
                <div>
                  <Label>Name</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={personalData.name}
                    onChange={handlePersonalChange}
                    className="mb-1 mt-2"
                  />
                  {personalError.name && (
                    <p className="text-red-500 text-sm mb-2">{personalError.name}</p>
                  )}

                  <Label className='mt-3'>Title / Occupation</Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className='w-full font-normal mt-2 justify-between'>
                        {value
                          ? title.find((title) => title.value === value)?.label
                          : <span className='text-gray-400'>Select your title / Occupation...</span>}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                      <Command>
                        <CommandInput placeholder="Search title / Occupation...." className="h-9" />
                        <CommandList className="max-h-[300px] overflow-y-auto">
                          <CommandEmpty>No title / Occupation. found.</CommandEmpty>
                          <CommandGroup>
                            {title.map((data) => (
                              <CommandItem
                                key={data.value}
                                value={data.value}
                                onSelect={(currentValue) => {
                                  const newValue = currentValue;
                                  setValue(currentValue);
                                  handleTitleSelect(currentValue);
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
                  {personalError.title && (
                    <p className="text-red-500 text-sm mt-1">{personalError.title}</p>
                  )}
                  <Label className='mt-3'>Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Write a short bio..."
                    value={personalData.bio}
                    onChange={handlePersonalChange}
                    className="mt-2"
                  />
                  {personalError.bio && (
                    <p className="text-red-500 text-sm mt-1 mb-2">{personalError.bio}</p>
                  )}
                  <div className="mt-auto">
                    <Button
                      disabled={!isPersonalChanged || isPersonalLoading}
                      onClick={handlePersonalSubmit}
                      className="w-full mt-3 bg-blue-800 hover:bg-blue-900"
                    >
                      {isPersonalLoading ? (
                        <>
                          <Loader2Icon className="animate-spin mr-2" />
                          Please wait...
                        </>
                      ) : "Save Changes"}
                    </Button>
                  </div>
                </div>

              ) : (
                <>
                  <Skeleton className="h-4 w-24 mb-2 rounded-sm" />
                  <Skeleton className="h-9 w-full mb-4 rounded-sm" />

                  <Skeleton className="h-4 w-20 mb-2 rounded-sm" />
                  <Skeleton className="h-9 w-full mb-4" />

                  <Skeleton className="h-4 w-16 mb-2 rounded-sm" />
                  <Skeleton className="h-20 w-full mb-5" />

                  <Skeleton className="h-9 w-full mb-" />
                </>
              )}



          </div>
        </div>

        {/* PASSWORD */}
        <div className="bg-white rounded-xl border w-full max-w-lg flex flex-col">

          <div className="flex items-center gap-3 px-6 py-3 border-b">
            <div className="w-[3px] h-5 bg-blue-800 rounded"></div>
            <h3 className="font-semibold text-lg">Password & Security</h3>
          </div>

          <div className="p-5 pt-4 flex flex-col flex-1">

            <Label>Current Password</Label>
            <div className="relative mb-3 mt-1.5">
              <Input
                id="currentPassword"
                placeholder="Enter current password"
                type={show.current ? "text" : "password"}
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                onClick={() => setShow(prev => ({ ...prev, current: !prev.current }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-800"
              >
                {show.current ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <Label>New Password</Label>
            <div className="relative mb-3 mt-1.5">
              <Input
                id="newPassword"
                placeholder="Enter new password"
                type={show.new ? "text" : "password"}
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                onClick={() => setShow(prev => ({ ...prev, new: !prev.new }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-800"
              >
                {show.new ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <motion.ul className="text-sm mb-5 ml-2 space-y-1">
              <li className={checks.length ? "text-green-600" : "text-slate-400"}>• 8+ characters</li>
              <li className={checks.upper ? "text-green-600" : "text-slate-400"}>• Uppercase letter</li>
              <li className={checks.number ? "text-green-600" : "text-slate-400"}>• Number</li>
              <li className={checks.special ? "text-green-600" : "text-slate-400"}>• Special character</li>
            </motion.ul>

            <Label>Confirm Password</Label>
            <div className="relative mb-3 mt-1.5">
              <Input
                id="confirmPassword"
                placeholder="Confirm new password"
                type={show.confirm ? "text" : "password"}
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                onClick={() => setShow(prev => ({ ...prev, confirm: !prev.confirm }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-blue-800"
              >
                {show.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {passwordError && <p className="text-red-500 text-sm mb-4">{passwordError}</p>}

            <div className="mt-auto">
              <Button
                disabled={isPasswordEmpty || isPasswordLoading}
                onClick={handlePasswordSubmit}
                className="w-full mt-3 bg-blue-800 hover:bg-blue-900"
              >
                {isPasswordLoading ? (
                  <>
                    <Loader2Icon className="animate-spin mr-2" />
                    Please wait...
                  </>
                ) : "Update Password"}
              </Button>
            </div>

          </div>
        </div>

      </div>
    </div>

  )
}
