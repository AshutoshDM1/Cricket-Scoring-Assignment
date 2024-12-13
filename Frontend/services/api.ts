import { FullMatchInfo } from "@/lib/types";
import axios from "axios";
import { toast } from "sonner";

const backendURL = "http://localhost:4000/";

const HandleError = (error: any): void => {
  if (error.response) {
    console.error("Server error:", error.response.data);
    toast.error(`Server error: ${error.response.data.message}`);
    return error.response.data;
  } else if (error.request) {
    console.error("No response from server:", error.request);
    toast.error("No response from server");
  } else {
    console.error("Request error:", error.message);
    toast.error(`Request error: ${error.message}`);
  }
};

export const getMatchInfo = async () => {
  const response = await axios.get(backendURL + "match");
  return response.data;
};

export const sendMatchInfo = async (matchInfo: FullMatchInfo) => {
  try {
    const response = await axios.post(`${backendURL}`, matchInfo);
    toast.success(response.data.message);
    return;
  } catch (error) {
    HandleError(error);
  }
};
