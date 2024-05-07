import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import LockIcon from "@mui/icons-material/Lock";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

import "./Register.css";

import { useFormik } from "formik";
import SignInGoogle from "../../components/signInGoogle";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config";

import * as Yup from "yup";

import { useNavigate } from "react-router-dom";
import SignInFaceBook from "../../components/signInFaceBook";
import SignInApple from "../../components/signInApple";

import { bgGray, hoverGreen, primary, textGrey } from "../../const/constCSS";

import { setUserLogin } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectorAuth } from "../../selector";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Mật khẩu là bắt buộc"),
});

function Register() {
  const result = useSelector(selectorAuth);
  console.log(result);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((res) => {
          navigate("/my-wallets");
          dispatch(setUserLogin(res.user));
          localStorage.setItem('userAuth', JSON.stringify({uid: res.user.uid, email: res.user.email}));
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  return (
    <>
      <Box>
        <Box
          sx={{
            paddingTop: "56px",
            backgroundColor: "rgb(0, 113, 15)",
          }}
        >
          <Card
            sx={{
              borderRadius: "18px",
              margin: "0 auto",
              width: "74px",
            }}
          >
            <CardMedia
              component="img"
              height="74px"
              image="img/logo.png"
              alt="logo"
              sx={{ cursor: "pointer" }}
            />
          </Card>
          <Typography
            align="center"
            variant="subtitle1"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontSize: "32px",
              color: "white",
              fontWeight: "600",
              paddingtop: "24px",
              paddingBottom: "32px",
              cursor: "pointer",
            }}
          >
            Money Lover
          </Typography>
          <Box
            sx={{
              width: "40%",
              margin: "0 auto",
              backgroundColor: "white",
              paddingTop: "42px",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          >
            <Typography
              align="center"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: "700",
                fontSize: "32px",
                fontStyle: "normal",
                lineHeight: "48px",
              }}
            >
              Regester
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: `${bgGray}`,
            paddingBottom: "44px",
          }}
        >
          <Box
            sx={{
              width: "40%",
              margin: "0 auto",
              backgroundColor: "white",
              borderBottomLeftRadius: "20px",
              borderBottomRightRadius: "20px",
              paddingBottom: "40px",
            }}
          >
            <Grid
              container
              sx={{
                display: "flex",
              }}
            >
              <Grid item xs={6}>
                <Box
                  sx={{
                    marginLeft: "16px",
                    marginRight: "16px",
                  }}
                >
                  <Typography
                    mt={4}
                    mb={2}
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontWeight: "400",
                      fontSize: "16px",
                      fontStyle: "normal",
                      lineHeight: "24px",
                      color: `${textGrey}`,
                    }}
                  >
                    Using social networking accounts
                  </Typography>
                  <SignInGoogle />
                  <SignInFaceBook />
                  <SignInApple />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  sx={{
                    marginLeft: "16px",
                    marginRight: "16px",
                  }}
                >
                  <Typography
                    mt={4}
                    mb={2}
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontWeight: "400",
                      fontSize: "16px",
                      fontStyle: "normal",
                      lineHeight: "24px",
                      color: `${textGrey}`,
                    }}
                  >
                    Using Money Lover account
                  </Typography>
                  <Box
                    sx={{
                      borderLeft: "1px solid rgb(224, 224, 224)",
                      paddingLeft: "16px",
                      marginLeft: "-16px",
                    }}
                  >
                    <form onSubmit={formik.handleSubmit}>
                      <Box mb={3}>
                        <TextField
                          type="email"
                          name="email"
                          onChange={formik.handleChange}
                          value={formik.values.email}
                          placeholder="Email"
                          fullWidth
                          color="success"
                          error={
                            formik.touched.email && Boolean(formik.errors.email)
                          }
                          helperText={
                            formik.touched.email && formik.errors.email
                          }
                          required
                        />
                      </Box>
                      <TextField
                        type="password"
                        name="password"
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        placeholder="password"
                        fullWidth
                        color="success"
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
                        required
                        InputProps={{
                          endAdornment: (
                            <InputAdornment>
                              <IconButton>
                                <LockIcon />
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      <Button
                        type="submit"
                        style={{
                          width: "100%",
                          padding: "10px 0",
                          borderRadius: "10px",
                          border: "1px solid white",
                          fontFamily: "Roboto, sans-serif",
                          fontWeight: "500",
                          fontSize: "16px",
                          fontStyle: "normal",
                          lineHeight: "normal",
                        }}
                        sx={{
                          marginTop: "40px",
                          backgroundColor: `${primary}`,
                          color: "white",
                          "&:hover": {
                            backgroundColor: `${hoverGreen}`,
                            color: "white",
                          },
                        }}
                      >
                        REGISTER
                      </Button>
                    </form>
                  </Box>
                  <Typography mt={2} align="center">
                    Don’t have an account? &nbsp;
                    <Link
                      href="/auth"
                      sx={{
                        cursor: "pointer",
                        color: `${primary}`,
                        "&:hover": {
                          color: `${hoverGreen}`,
                        },
                      }}
                    >
                      Sign In
                    </Link>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Register;
