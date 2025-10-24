import { uriAuth } from "@/public/apiuri/uri";

export async function getMe() {
  try {
    const res = await fetch(`${uriAuth}/me`, {
      method:'GET',
      credentials: 'include', // include HttpOnly cookie
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
