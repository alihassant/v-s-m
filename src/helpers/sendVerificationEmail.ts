import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "../../types/ApiResponse";

export async function sendVerificationEmail(
  username: string,
  email: string,
  otp: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "VSM | Verification OTP",
      react: VerificationEmail({ username, otp }),
    });
    return { success: true, message: "Verification email sent successfully" };
  } catch (error) {
    return { success: false, message: "Failed to send verification email" };
  }
}
