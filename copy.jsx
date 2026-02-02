'use client'

import { ChevronLeft, Camera, CloudUpload, Loader2Icon } from 'lucide-react'
import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAppSelector } from "@/store"

import logo from '../../public/images/logo/logoName.png'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

const im = 'https://yt3.ggpht.com/Way4TqSlkTcuLw9q6Q9lth3NKNt6-tEl5rWMbxiyUrbnJAYuST48TQAio_8JmWHmyXmMFcBt=s88-c-k-c0x00ffffff-no-rj'

export default function Page() {

  const user = useAppSelector((s) => s.user?.data)

  // image state
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(im)
  const [imageError, setImageError] = useState("")

  // loading states
  const [isPersonalLoading, setIsPersonalLoading] = useState(false)
  const [isPasswordLoading, setIsPasswordLoading] = useState(false)

  // personal form
  const [personalData, setPersonalData] = useState({
    name: user?.name || "",
    title: user?.title || "",
    bio: user?.bio || ""
  })

  // password form
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const [passwordError, setPasswordError] = useState("")

  // input handlers
  const handlePersonalChange = useCallback((e) => {
    const { id, value } = e.target
    setPersonalData(prev => ({ ...prev, [id]: value }))
  }, [])

  const handlePasswordChange = useCallback((e) => {
    const { id, value } = e.target
    setPasswordData(prev => ({ ...prev, [id]: value }))
  }, [])

  // image validation
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (!file) return

    const allowed = ["image/jpeg", "image/jpg", "image/png"]

    if (!allowed.includes(file.type)) {
      setImageError("Only JPG, JPEG, PNG files allowed")
      return
    }

    setImageError("")
    setSelectedFile(file)
    setPreview(URL.createObjectURL(file))
  }

  // detect personal change
  const isPersonalChanged =
    personalData.name !== (user?.name || "") ||
    personalData.title !== (user?.title || "") ||
    personalData.bio !== (user?.bio || "") ||
    selectedFile !== null

  // submit personal
  const handlePersonalSubmit = async () => {
    if (!isPersonalChanged) return

    setIsPersonalLoading(true)

    await new Promise(res => setTimeout(res, 1500))

    setIsPersonalLoading(false)
  }

  // submit password
  const handlePasswordSubmit = async () => {

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Passwords do not match")
      return
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
        <div className="max-w-6xl mx-auto px-4 py-2 flex justify-between items-center">

          <Link href="/chats">
            <Image alt="logo" src={logo} className="w-28 cursor-pointer" />
          </Link>

          <div className="flex items-center gap-4">

            <Link
              href="/chats"
              className="flex items-center gap-2 text-sm text-blue-800 font-medium bg-blue-100 hover:bg-blue-200 px-3 py-2 rounded-md"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Chats
            </Link>

            <div className="w-12 h-12 relative">
              <Image src={preview} alt="profile" fill className="rounded-full object-cover border" />
            </div>

          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto px-4 mt-10 flex flex-col lg:flex-row justify-between gap-8 pb-12">

        {/* PERSONAL */}
        <div className="bg-white rounded-xl border w-full max-w-lg flex flex-col">

          <div className="flex items-center gap-3 px-6 py-4 border-b">
            <div className="w-[3px] h-5 bg-blue-800 rounded"></div>
            <h3 className="font-semibold text-lg">Personal Information</h3>
          </div>

          <div className="p-6 flex flex-col flex-1">

            <div className="flex flex-col items-center mb-6 gap-4">

              <label htmlFor="file-input" className="relative group cursor-pointer">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border shadow-sm">
                  <Image src={preview} fill alt="avatar" className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
              </label>

              <label htmlFor="file-input" className="group flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-100 text-blue-800 cursor-pointer transition hover:bg-blue-200 font-medium text-sm">
                <CloudUpload className="w-5 h-5 group-hover:-translate-y-1 transition" />
                Change photo
              </label>

              {imageError && <p className="text-red-500 text-xs">{imageError}</p>}

              <input id="file-input" type="file" className="hidden" onChange={handleFileChange} />
            </div>

            <Label>Name</Label>
            <Input id="name" value={personalData.name} onChange={handlePersonalChange} className="mb-4 mt-2" />

            <Label>Title</Label>
            <Input id="title" value={personalData.title} onChange={handlePersonalChange} className="mb-4 mt-2" />

            <Label>Bio</Label>
            <Textarea id="bio" value={personalData.bio} onChange={handlePersonalChange} className="mb-6 mt-2" />

            <div className="mt-auto">
              <Button
                disabled={!isPersonalChanged || isPersonalLoading}
                onClick={handlePersonalSubmit}
                className="w-full bg-blue-800 hover:bg-blue-900"
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
        </div>

        {/* PASSWORD */}
        <div className="bg-white rounded-xl border w-full max-w-lg flex flex-col">

          <div className="flex items-center gap-3 px-6 py-4 border-b">
            <div className="w-[3px] h-5 bg-blue-800 rounded"></div>
            <h3 className="font-semibold text-lg">Password & Security</h3>
          </div>

          <div className="p-6 flex flex-col flex-1">

            <Label>Current Password</Label>
            <Input id="currentPassword" placeholder='Enter current password' type="password" value={passwordData.currentPassword} onChange={handlePasswordChange} className="mb-4 mt-2" />

            <Label>New Password</Label>
            <Input id="newPassword" placeholder='Enter new password' type="password" value={passwordData.newPassword} onChange={handlePasswordChange} className="mb-4 mt-2" />

            <Label>Confirm Password</Label>
            <Input id="confirmPassword" placeholder='Confirm password' type="password" value={passwordData.confirmPassword} onChange={handlePasswordChange} className="mb-3 mt-2" />

            {passwordError && <p className="text-red-500 text-xs mb-4">{passwordError}</p>}

            <div className="mt-auto">
              <Button
                disabled={isPasswordLoading}
                onClick={handlePasswordSubmit}
                className="w-full bg-blue-800 hover:bg-blue-900"
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
