import { uriUser } from "@/public/apiuri/uri";

export async function updateUserProfile(data: FormData) {
  const res = await fetch(`${uriUser}/update-profile`, {
    method: 'PUT',
    body: data,
    credentials: 'include',
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || 'Profile update failed');
  }

  return result; // return server response
}
