'use client'
import { EllipsisVertical, Heart } from 'lucide-react';
import Image from 'next/image';
import HeartFavorite from './HeartFavorite';
import { use, useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"
import { demoUsers } from '../demoUser';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Label } from "@/components/ui/label"
const TopBarViewChat = (props) => {
    const { selectedChatId } = props;
    const [selectedUser, setSelectedUser] = useState({

        id: 10,
        name: "Jack Taylor",
        title: "Sales Representative",
        image_uri: "https://yt3.ggpht.com/A4I8QX3OIpQGjYiQ7eOp9sZZYchkQSACtMXQZ64HYalx_3DHTRXfTTH8YbFuqdwJP6L7A1SE3Q=s88-c-k-c0x00ffffff-no-rj",
        message: "I closed the deal! I'll update the records in the CRM.",
        sendTime: "1:45 PM",
        new_message_number: 10

    });
    useEffect(() => {
        if (selectedChatId) {
            const findSelectedUser = demoUsers.find(data => data.id === selectedChatId);
            setSelectedUser(findSelectedUser)
        }
    }, [selectedChatId])
    const [isLiked, setIsLiked] = useState(false);

    // Function to toggle the state
    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    return (
        <div className='h-22 flex justify-between items-center px-8 border-b'>
            <div className='flex gap-3'>
                <div>
                    <Image
                        alt='author image'
                        width={55}
                        height={55}
                        className='rounded-full'
                        src={selectedUser.image_uri} />
                </div>
                <div>
                    <p className='text-lg font-semibold'>{selectedUser.name}</p>
                    <p className='text-green-500 font-semibold'>online...</p>
                </div>
            </div>
            <div className='flex gap-2 justify-center items-center'>
                <Tooltip>
                    <TooltipTrigger>
                        <HeartFavorite
                            size={25}
                            fill={isLiked ? '#e11d48' : 'none'}
                            stroke={isLiked ? '#e11d48' : 'black'}
                            onClick={handleLikeClick}
                            style={{ cursor: 'pointer' }}
                        />
                    </TooltipTrigger>
                    <TooltipContent>
                        {
                            !isLiked ?
                                <p>Add to favorites</p> :
                                <p>Favorite</p>
                        }
                    </TooltipContent>
                </Tooltip>

                <Popover>
                    <PopoverTrigger>
                        <EllipsisVertical className='cursor-pointer hover:bg-slate-100 p-1 rounded-full w-8 h-8 transition-colors duration-250' />
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="leading-none font-medium">Dimensions</h4>
                                <p className="text-muted-foreground text-sm">
                                    Set the dimensions for the layer.
                                </p>
                            </div>
                            <div className="grid gap-2">
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="width">Width</Label>
                                    <Input
                                        id="width"
                                        defaultValue="100%"
                                        className="col-span-2 h-8"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="maxWidth">Max. width</Label>
                                    <Input
                                        id="maxWidth"
                                        defaultValue="300px"
                                        className="col-span-2 h-8"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="height">Height</Label>
                                    <Input
                                        id="height"
                                        defaultValue="25px"
                                        className="col-span-2 h-8"
                                    />
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="maxHeight">Max. height</Label>
                                    <Input
                                        id="maxHeight"
                                        defaultValue="none"
                                        className="col-span-2 h-8"
                                    />
                                </div>
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};

export default TopBarViewChat;