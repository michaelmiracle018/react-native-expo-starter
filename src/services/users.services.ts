import { axiosInstance } from "~/api/axiosInstance";
import { displayErrorMessage } from "~/utils/displayErrorMessage";

// * GET USERS INFORMATION
export async function serviceUserInformation() {
  try {
    const response = await axiosInstance.get("/user/user-profile");
    const { result } = response?.data;
    if (result) return result;
    return null;
  } catch (error) {
    displayErrorMessage(error);
  }
}
