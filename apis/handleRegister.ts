import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { uriAuth } from '@/public/apiuri/uri'
interface RegistrationFormData {
    name: string;
    email: string;
    country: string;
    password: string;
    confirmPassword: string;
}
export const registerAuth = async (data: RegistrationFormData, router:AppRouterInstance) => {
    console.log(data,router)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...dataToSend } = data;
    try {
        const response = await fetch(`${uriAuth}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });
        const responseData = await response.json();
        if (!response.ok) {
            return (responseData.message || 'Network response was not ok');
        }

        if (responseData) {
            alert(`${responseData.message}, ${responseData.email}`)
        } 
    }catch (error) {
        // console.error('An error occurred during registration:', error);
        if (error instanceof Error) {
            return error.message;
        } else {
            return 'An unknown error occurred.';
        }
    }
}

