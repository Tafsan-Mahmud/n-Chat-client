import { uriAuth } from "@/public/apiuri/uri";

export async function logOut() {
  try {
    const res = await fetch(`${uriAuth}/logout`, {
      method: "POST",
      credentials: "include", // 🔥 important: send cookies
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return data;
  } catch (err) {
    return { success: false, status: 500, message: "Network error during logout" };
  }
}