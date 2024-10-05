import { Toast } from "react-native-toast-notifications";

export function displayErrorMessage(error: any) {
  const errorMessage = error?.response?.data?.message;

  Toast.hideAll();

  if (error?.response?.data?.errorType === "kyc_required") {
    // store.dispatch(
    //   toggleUserVerificationAndSessionModal({
    //     userKycVerified: true,
    //     showKYCModal: true,
    //     showMainModal: true,
    //   }),
    // );
  } else if (error?.message.includes("Network Error")) {
    Toast.show(`An error occurred, please try again!`, {
      type: "custom_toast_without_title",
      animationDuration: 300,
      normalColor: "error",
    });
  } else {
    Toast.show(`${errorMessage}`, {
      type: "custom_toast_without_title",
      animationDuration: 300,
      normalColor: "error",
    });
  }
}
