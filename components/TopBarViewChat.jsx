'use client'
import { Heart } from 'lucide-react';
import Image from 'next/image';
import HeartFavorite from './HeartFavorite';
import { useState } from 'react';
const TopBarViewChat = () => {
    const [isLiked, setIsLiked] = useState(false);

    // Function to toggle the state
    const handleLikeClick = () => {
        setIsLiked(!isLiked);
    };

    return (
        <div className='h-20 bg-slate-50 flex justify-between items-center px-8 border-b'>
            <div className='flex gap-3'>
                <div>
                    <Image
                        alt='author image'
                        width={55}
                        height={55}
                        className='rounded-full'
                        src={'https://yt3.ggpht.com/Way4TqSlkTcuLw9q6Q9lth3NKNt6-tEl5rWMbxiyUrbnJAYuST48TQAio_8JmWHmyXmMFcBt=s88-c-k-c0x00ffffff-no-rj'} />
                </div>
                <div>
                    <p className='text-lg font-semibold'>Bob Johnson</p>
                    <p className='text-green-500'>online</p>
                </div>
            </div>
            <div>
                <HeartFavorite
                    size={25}
                    fill={isLiked ? '#e11d48' : 'none'}
                    stroke={isLiked ? '#e11d48' : 'black'}
                    onClick={handleLikeClick}
                    style={{ cursor: 'pointer' }}
                />
            </div>
        </div>
    );
};

export default TopBarViewChat;