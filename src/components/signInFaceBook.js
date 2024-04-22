import React from 'react';

import { auth, provider } from "../config";
import { signInWithPopup } from "firebase/auth";
import FacebookIcon from "@mui/icons-material/Facebook";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUserLogin } from '../redux/slices/authSlice';

const SignInFaceBook = () => {
  const ditpatch = useDispatch();
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
          console.log(error);
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
            color: "rgb(24, 120, 242)",
            border: "2px solid rgb(24, 120, 242)",
            "&:hover": {
              backgroundColor: "rgb(24, 120, 242)",
              color: "white",
            },
          }}
        >
          <FacebookIcon
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
            Connect with Facebook
          </Typography>
        </Box>
      </Box>
    );
}

export default SignInFaceBook;
