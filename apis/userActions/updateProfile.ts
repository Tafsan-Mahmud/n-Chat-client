import { uriUser } from "@/public/apiuri/uri";


export async function updateUserProfile(data: FormData) {
  try {
    const res = await fetch(`${uriUser}/update-profile`, {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || 'Profile update failed');
    }

    return result; 

  } catch (error: unknown) {
    const err = error as Error;
    throw new Error(err.message || 'Network error occurred');
  }
}