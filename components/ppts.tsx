import Link from 'next/link';
import React from 'react';

const Ppts = () => {
    return (
        <div className='p-5 flex gap-4 text-neutral-600 z-15'>
           <Link href={'#'}><span className="inline-block text-sm underline-offset-4 hover:underline">Help</span></Link>
           <Link href={'/authOTP'}><span className="inline-block text-sm underline-offset-4 hover:underline">Privacy</span></Link>
           <Link href={'#'}><span className="inline-block text-sm underline-offset-4 hover:underline">Terms</span></Link> 
        </div>
    );
};

export default Ppts;