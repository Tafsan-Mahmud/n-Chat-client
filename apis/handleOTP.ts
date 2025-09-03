import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { uri } from '@/public/apiuri/uri';
interface RegistrationFormData {
    email: string;
    password: string;
}
export const OTPAuth = async (data: RegistrationFormData, router: AppRouterInstance) => {
    console.log(data, router)
    // try {
    //     const response = await fetch(`${uri}/merchant/register`, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(data),
    //     });

    //     const responseData = await response.json();
    //     if (!response.ok) {
    //         return (responseData.message || 'Network response was not ok');
    //     }

    //     if (responseData.status === 'SUCCESS') {
    //         if (responseData.action === "showemailotp") {
    //             sessionStorage.setItem('resdt', responseData.data)
    //             sessionStorage.setItem('resml', responseData.email)
    //             router.push(`/verify-account?redirection=otp_sending_registration_${responseData.email} `);
    //         }
    //     } else {
    //         return responseData;
    //     }
    // } catch (error) {
    //     // console.error('An error occurred during registration:', error);
    //     if (error instanceof Error) {
    //         return error.message;
    //     } else {
    //         return 'An unknown error occurred.';
    //     }
    // }
}

