import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { uriAuth } from '@/public/apiuri/uri';
interface AuthResponse {
    status: string;
    message: string;
}
interface otpData {
    otp: string;
    email: string;
}
export const OTPAuth = async (data: otpData, router: AppRouterInstance) => {
    try {
        const response = await fetch(`${uriAuth}/verify-otp`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        if (!response.ok) {
            if (responseData.redirect === '/register') {
                sessionStorage.removeItem('resusrmail');
                sessionStorage.removeItem('resusrmailmsk');
                sessionStorage.removeItem('resusrtkn');
                router.push(responseData.redirect)
                return responseData;
            } else {
                return (responseData || 'Network response was not ok');
            }
        } else {
            if (responseData.status === 'SUCCESS') {
                sessionStorage.removeItem('resusrmail');
                sessionStorage.removeItem('resusrmailmsk');
                sessionStorage.removeItem('resusrtkn');
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

