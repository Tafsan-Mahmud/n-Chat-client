import React from 'react';
import { Settings } from 'lucide-react';
import Image from 'next/image';
const AuthorSec = () => {
    return (
        <div className='py-8 px-8 flex items-center gap-3'>
            <div className=''>
                <Image
                    alt='author image'
                    width={100}
                    height={100}
                    className='rounded-full'
                    src={'https://yt3.ggpht.com/yti/ANjgQV_53OCUJNvxFfI_hbBWcFPzQRqcF6YZK-CcsvyPKXX4hho=s88-c-k-c0x00ffffff-no-rj'} />
            </div>
            <div className='flex w-full justify-between'>
                <div>
                    <p className='text-xl font-semibold text-blue-800'>Abu Hasnat Nobin</p>
                    <p className='text-md text-slate-600'>Senior Developer</p>
                </div>
                <div className='flex items-center border-l pl-2'>
                    <Settings className='text-slate-600 cursor-pointer'/>
                </div>
            </div>
        </div>
    );
};

export default AuthorSec;