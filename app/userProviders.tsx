'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store, useAppDispatch } from '@/store';
import { setUser, clearUser } from '@/store/userSlice';
import { getMe } from '@/apis/authME';


// inner component runs after Redux store is ready
function HydrateUser() {

    const dispatch = useAppDispatch();

    function hasSessionCookie(): boolean {
        return document.cookie.split('; ').some(row => row.startsWith('hasSession='));
    }
    useEffect(() => {
        if (!hasSessionCookie()) {
            dispatch(clearUser());
            return;
        }
        (async () => {
            const me = await getMe();
            if (me) {
                console.log(me);
                dispatch(setUser(me))
            }
            else {
                dispatch(clearUser())
            };
        })();
    }, [dispatch]);

    return null;
}

export default function UserProvider({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <HydrateUser />
            {children}
        </Provider>
    );
}
