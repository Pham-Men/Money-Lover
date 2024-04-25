import FacebookIcon from "@mui/icons-material/Facebook";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const SignInFaceBook = () => {
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
          color: "rgb(24, 120, 242)",
          border: "2px solid rgb(24, 120, 242)",
          "&:hover": {
            backgroundColor: "rgb(24, 120, 242)",
            color: "white",
          },
        }}
      >
        <FacebookIcon
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
          Connect with Facebook
        </Typography>
      </Box>
    </Box>
  );
};

export default SignInFaceBook;
