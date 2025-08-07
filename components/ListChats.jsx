import React from 'react';
import Image from 'next/image';
import AuthorSec from './AuthorSec';
import { Input } from "@/components/ui/input"
import { Search, Settings } from 'lucide-react';
const demoUsers = [
    {
        name: "Alice Smith",
        title: "Software Engineer",
        image_uri: "https://yt3.ggpht.com/ytc/AIdro_neo-y7z_Z7JprdseSPtS-SaJjhYaB2ErjBbebGK222uQ=s88-c-k-c0x00ffffff-no-rj",
        message: "Hey, I just wanted to touch base with you about the project.",
        sendTime: "10:30 AM",
        new_message_number: 4
    },
    {
        name: "Bob Johnson",
        title: "Product Manager",
        image_uri: "https://yt3.ggpht.com/Way4TqSlkTcuLw9q6Q9lth3NKNt6-tEl5rWMbxiyUrbnJAYuST48TQAio_8JmWHmyXmMFcBt=s88-c-k-c0x00ffffff-no-rj",
        message: "The new feature is ready for review. Let me know what you think.",
        sendTime: "1h ago",
        new_message_number: 0
    },
    {
        name: "Charlie Brown",
        title: "UX Designer",
        image_uri: "https://yt3.ggpht.com/nWc7GLcQcyggG4ZujmEy6vmyAIsD4VeGqG5me2g5uNcR4X6gRdwEJ084NFi8dv-eJMpmn_pzGA=s88-c-k-c0x00ffffff-no-rj",
        message: "I've updated the wireframes. You can find them in the shared folder.",
        sendTime: "Yesterday",
        new_message_number: 0
    },
    {
        name: "Diana Prince",
        title: "Data Scientist",
        image_uri: "https://yt3.ggpht.com/V1yZmG_ps71_uIpbStLl5-q50y7HT3td4JcwnF26jqYkylruozDCkJT3H9SZoxi988bJgIEL=s88-c-k-c0x00ffffff-no-rj",
        message: "The Q4 report is finalized. I'll send it over shortly.",
        sendTime: "3:15 PM",
        new_message_number: 9
    },
    {
        name: "Eve Adams",
        title: "Marketing Specialist",
        image_uri: "https://yt3.ggpht.com/GABHEdDFOwBPNPeax714Z8OeVTo7R4QvbPVOzB5QW31nXc6ja-rfoH2Y8LAV2yl-dhKVyYlZeg=s88-c-k-c0x00ffffff-no-rj",
        message: "Our new ad campaign is live. We're seeing great engagement so far.",
        sendTime: "9:00 AM",
        new_message_number: 0
    },
    {
        name: "Frank White",
        title: "DevOps Engineer",
        image_uri: "https://yt3.ggpht.com/xDc8yrc64lBOpUARZ05s_L987V82DTmUesQnb-HnxHsK2pHPbm_eM_GAXhcSG-Ru8DLZ7xcpPQ=s88-c-k-c0x00ffffff-no-rj",
        message: "We're experiencing some server issues. I'm investigating the root cause now.",
        sendTime: "2 days ago",
        new_message_number: 1
    },
    {
        name: "Grace Lee",
        title: "Content Creator",
        image_uri: "https://yt3.ggpht.com/ytc/AIdro_l0zjZxNU3I_L7fX8ctYmKG0XV5JJ2CJa55FbQhHJ8NALE=s88-c-k-c0x00ffffff-no-rj",
        message: "I finished writing the blog post. It's ready for your final review.",
        sendTime: "4h ago",
        new_message_number: 6
    },
    {
        name: "Henry Clark",
        title: "Financial Analyst",
        image_uri: "https://yt3.ggpht.com/cgOTgQOP0PFXadljAVWXK-6T9XW9IS105IRoh9PVmIPt5SepEewUQ7GW6nkOrUV1bJ9dV9wReQ=s88-c-k-c0x00ffffff-no-rj",
        message: "I have some new insights on the budget. Let's schedule a call to discuss.",
        sendTime: "Yesterday",
        new_message_number: 3
    },
    {
        name: "Ivy Green",
        title: "Project Coordinator",
        image_uri: "https://yt3.ggpht.com/S37E9YG-eDkhbg7vrZgRMMAE_X1qvPv1KDnJs30E689lLdxhYdaiejitka5fqNxqmfpeLU-ulyQ=s88-c-k-c0x00ffffff-no-rj",
        message: "The team meeting for tomorrow has been moved to 2 PM.",
        sendTime: "2:45 PM",
        new_message_number: 8
    },
    {
        name: "Jack Taylor",
        title: "Sales Representative",
        image_uri: "https://yt3.ggpht.com/A4I8QX3OIpQGjYiQ7eOp9sZZYchkQSACtMXQZ64HYalx_3DHTRXfTTH8YbFuqdwJP6L7A1SE3Q=s88-c-k-c0x00ffffff-no-rj",
        message: "I closed the deal! I'll update the records in the CRM.",
        sendTime: "1:45 PM",
        new_message_number: 10
    }
];



const ListChats = () => {
    return (
        <div className='flex-1 overflow-y-auto border-r min-h-[100vh] bg-slate-50 custom-scrollbar-container'>
            <AuthorSec />
            {/* Search Input */}
            <div className='relative mx-8'>
                <Input className="rounded-lg h-12 pl-10 bg-white !text-[15px] text-slate-600" type="email" placeholder="search any persone" />
                <Search className='absolute top-3 text-slate-600 left-2 h-6 w-6' />
            </div>

            {/* User List */}

            <div className='mt-5 px-4'>
                {
                    demoUsers.map((user, i) => {
                        return <div key={i} className='py-4 px-4 rounded-md cursor-pointer hover:bg-slate-200 flex items-center gap-3'>
                            <div className=''>
                                <Image
                                    alt='author image'
                                    width={70}
                                    height={70}
                                    className='rounded-full'
                                    src={user.image_uri} />
                            </div>
                            <div className='flex w-full justify-between'>
                                <div>
                                    <p className='text-lg font-semibold text-blue-800'>{user.name}</p>

                                    <p className={`text-sm text-slate-700 ${user.new_message_number > 0 ? 'font-bold' : ''}`}>
                                        {user.message.slice(0, 37) + '...'}
                                    </p>
                                </div>
                                <div className='flex items-end flex-col mt-1'>
                                    <span className='text-sm'>{user.sendTime}</span>
                                    {
                                        user.new_message_number > 0 &&
                                        <div className='font-semibold  text-sm text-white bg-blue-800 w-5 h-5 rounded-full flex items-center justify-center'>
                                        {user.new_message_number}
                                    </div>
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    })
                }

            </div>
        </div>
    );
};

export default ListChats;