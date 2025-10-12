import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { uriAuth } from '@/public/apiuri/uri';
interface RegistrationFormData {
    email: string;
    password: string;
}
interface AuthResponse {
    status: string;
    message: string;
}
export const SigninAuth = async (data: RegistrationFormData, router: AppRouterInstance) => {
    console.log(data, router)
    try {
        const response = await fetch(`${uriAuth}/signin`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();
        if (!response.ok) {
            return (responseData.message || 'Network response was not ok');
        }
        if (responseData.status === 'SUCCESS') {
               return responseData;
        }
    } catch (error) {

        // console.error('An error occurred during registration:', error);
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

