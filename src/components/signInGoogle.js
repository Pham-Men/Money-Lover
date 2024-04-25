import React from 'react';
import { auth, provider } from "../config";
import { signInWithPopup } from "firebase/auth";
import GoogleIcon from "@mui/icons-material/Google";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUserLogin } from '../redux/slices/authSlice';

const SignInGoogle = () => {

  const ditpatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
      signInWithPopup(auth, provider)
        .then((result) => {
            console.log(result);
          const user = result.user;
          ditpatch(setUserLogin(user))
          localStorage.setItem('userAuth', JSON.stringify(user));
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
            color: "rgb(250, 93, 93)",
            border: "2px solid rgb(250, 93, 93)",
            "&:hover": {
              backgroundColor: "rgb(250, 93, 93)",
              color: "white",
            },
          }}
        >
          <GoogleIcon
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
            Connect with Google
          </Typography>
        </Box>
      </Box>
    );
}

export default SignInGoogle;
