import { axiosInstance } from "~/api/axiosInstance";
import { userForgotPasswordProps } from "~/app/(auth)/forgetPassword";
import { userLoginForm } from "~/app/(auth)/login";
import { SendEmailProp } from "~/types";

export function serviceAuthLogin(data: userLoginForm) {
  return axiosInstance.post("/auth/login", data);
}

// * SEND EMAIL RESET PASSWORD CODE
export function serviceSendEmailResetPasswordCode(data: SendEmailProp) {
  return axiosInstance.post("/email/send-reset-password-code", data);
}

// * RESET PASSWORD
export function serviceResetPassword(data: userForgotPasswordProps) {
  return axiosInstance.post("/auth/reset-password", data);
}

// * SEND EMAIL OTP
export function serviceSmsOtpEmail(data: SendEmailProp) {
  return axiosInstance.post("/sms/otp/send/email", data);
}

// * VERIFY BOTH EMAIL AND PHONE
export function serviceVerifyEmailAndPhone(data: any) {
  return axiosInstance.post("/sms/otp/verify", data);
}

// * SEND PHONE OTP
export function serviceSmsOtpPhone(data: any) {
  return axiosInstance.post("/sms/otp/send/sms", data);
}

// * SIGN_UP USER
export function serviceAuthSignUP(data: any) {
  return axiosInstance.post("/auth/signup", data);
}

// * CHANGE PASSWORD
export async function serviceChangePassword(data: any) {
  return axiosInstance.post("/auth/change-password", data);
}
