import { uriUser } from "@/public/apiuri/uri";
type PasswordChangePayload = {
  currentPassword: string;
  newPassword: string;
};
export async function passwordChange(data: PasswordChangePayload) {
  
  try {
    const res = await fetch(`${uriUser}/account/change-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const result = await res.json();

    if (!res.ok) {
      return { success: false, message: result.message };
    }

    return { success: true, message: result.message };

  } catch (error) {
    return { success: false, message: "Something went wrong. Try again." };
  }
}
