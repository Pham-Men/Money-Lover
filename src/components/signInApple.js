
import React from "react";
import { auth, provider } from "../config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import AppleIcon from "@mui/icons-material/Google";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const SignInApple = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        navigate("/");
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <Box
      sx={{
        cursor: "pointer",
        marginBottom: "14px",
      }}
      onClick={handleGoogleSignIn}
    >
      <Box
        sx={{
          display: "flex",
          padding: "10px 10px",
          borderRadius: "6px",
          alignItems: "center",
          color: "rgb(0, 0, 0)",
          border: "2px solid rgb(0, 0, 0)",
          "&:hover": {
            backgroundColor: "rgb(0, 0, 0)",
            color: "white",
          },
        }}
        onClick={() => handleGoogleSignIn()}
      >
        <AppleIcon
          fontSize="small"
          sx={{
            paddingRight: "12px",
          }}
        />
        <Typography
          style={{
            fontFamily: "Roboto, sans-serif",
            fontWeight: "500",
            fontSize: "16px",
            fontStyle: "normal",
            lineHeight: "19px",
          }}
        >
          Sign in with Apple
        </Typography>
      </Box>
    </Box>
  );
};

export default SignInApple;
