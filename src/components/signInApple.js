
import AppleIcon from "@mui/icons-material/Apple";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const SignInApple = () => {
  
  return (
    <Box
      sx={{
        cursor: "pointer",
        marginBottom: "14px",
      }}
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
