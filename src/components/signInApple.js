
import React from "react";
import { auth, provider } from "../config";
import { signInWithPopup } from "firebase/auth";
import AppleIcon from "@mui/icons-material/Apple";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUserLogin } from '../redux/slices/authSlice';

const SignInApple = () => {
  const ditpatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      ditpatch(setUserLogin(user))
      navigate("/");
    })
      .catch((error) => {
        console.log(error)
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
          fontSize="large"
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
