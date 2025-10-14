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
            return (responseData || 'Network response was not ok');
        }else{
            return responseData;
        }
    }catch (error) {
        if (error instanceof Error) {
            const err : string | AuthResponse = {
                status: 'ERROR!',
                message: error.message || 'An error occurred during verification'
            }
            return err;
        } else {
            const err : string | AuthResponse = {
                status: 'ERROR!',
                message: 'An unknown error occurred.'
            }
            return err;
        }
    }
}

