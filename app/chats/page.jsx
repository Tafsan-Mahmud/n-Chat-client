import { Settings } from 'lucide-react';

import React from 'react';
import ListChats from '../../components/ListChats';
import ViewChat from '../../components/ViewChat';

const page = () => {
    return (
        <div className='w-full flex h-screen'>
                <ListChats />
            <div className='w-[50%]'>
            <ViewChat />
            </div>
                
            <div className='w-[25%]'>
            {/* <ViewChat /> */}
            </div>
        </div>
    );
};

export default page;