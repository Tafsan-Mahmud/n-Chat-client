import { redirect } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { uriAuth } from '@/public/apiuri/uri';
import { maskEmail } from '@/util/maskEmail';
interface signinData {
    email: string;
    password: string;
}
interface AuthResponse {
    status: string;
    message: string;
}
export const SigninAuth = async (data: signinData, router: AppRouterInstance) => {
    // console.log(data)
    try {
        const response = await fetch(`${uriAuth}/login`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();


        if (response.status === 429) {
            return {
                status: 429,
                message: responseData.message,
            };
        }

        if (!response.ok) {
            if (responseData.status === 'PROCESS!') {
                router.push(responseData.redirect);
                return responseData;
            } else {
                return (responseData || 'Network response was not ok');
            }
        } else {
            if (responseData.status === 'SUCCESS') {
                const mask = maskEmail(responseData.email)
                sessionStorage.setItem('resusrmail', responseData.email)
                sessionStorage.setItem('resusrmailmsk', mask)
                sessionStorage.setItem('resusrtkn', responseData.secret)
                router.push(responseData.redirect)
                return responseData;
            }
        }
    } catch (error) {
        if (error instanceof Error) {
            const err: string | AuthResponse = {
                status: 'ERROR!',
                message: error.message || 'An error occurred during verification'
            }
            return err;
        } else {
            const err: string | AuthResponse = {
                status: 'ERROR!',
                message: 'An unknown error occurred.'
            }
            return err;
        }
    }
}

