import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { uriAuth } from '@/public/apiuri/uri'
import { maskEmail } from '@/util/maskEmail';
interface RegistrationFormData {
    name: string;
    email: string;
    gender:string;
    country: string;
    password: string;
    confirmPassword: string;
}
interface AuthResponse {
    status: string;
    message: string;
}
interface AuthResponseSuccess {
    status: string;
    message: string;
    email: string;
}
export const registerAuth = async (data: RegistrationFormData, router: AppRouterInstance) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...dataToSend } = data;
    try {
        const response = await fetch(`${uriAuth}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(dataToSend),
        });
        const responseData = await response.json();
        if (!response.ok) {
            if (responseData.redirect) {
                const verify : string | AuthResponse = {
                    status: 'VERIFY!',
                    message: responseData.message
                }
                router.push(responseData.redirect)
                return verify;
            }
            const err : string | AuthResponse = {
                status: 'ERROR!',
                message: responseData.message
            }
            return (err || 'Network response was not ok');
        }
        if (responseData) {
            if(responseData.status === 'SUCCESS'){
                 const success : string | AuthResponseSuccess = {
                status: responseData.status,
                message: responseData.message,
                email:responseData.email,
            }
            const mask = maskEmail(responseData.email)
            sessionStorage.setItem('resusrmail',responseData.email)
            sessionStorage.setItem('resusrmailmsk',mask)
            sessionStorage.setItem('resusrtkn',responseData.token)
            router.push(responseData.redirect)
            return success;
            }
        }
    } catch (error) {
        
        // console.error('An error occurred during registration:', error);
        if (error instanceof Error) {
            const err : string | AuthResponse = {
                status: 'ERROR!',
                message: error.message || 'An error occurred during registration'
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

