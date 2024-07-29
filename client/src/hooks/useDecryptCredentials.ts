import Cookies from "js-cookie";
import { decryptData } from "@/util/cryptoUtils";

export function useDecryptCredentials() {
  const secretKey = "admin";
  const encryptedUsername = Cookies.get("username");
  const encryptedPassword = Cookies.get("password");

  if (encryptedUsername !== null && encryptedPassword !== null) {
    const username = decryptData(encryptedUsername, secretKey);
    const password = decryptData(encryptedPassword, secretKey);
    return { username, password, secretKey };
  } else {
    console.warn("Username and password are not set in Cookies");
    return { username: "", password: "" };
  }
}
