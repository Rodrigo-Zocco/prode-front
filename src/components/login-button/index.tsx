import { GoogleOAuthProvider } from "@react-oauth/google";
import Button from "./button";

export default function LoginButton() {
  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>
      <Button />
    </GoogleOAuthProvider>
  );
}
