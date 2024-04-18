import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import AppleIcon from '@mui/icons-material/Apple';
import LockIcon from '@mui/icons-material/Lock';

import { Button, Link } from "@mui/material";

function LogIn() {
    return (
        <>
            <Box>
                <Box
                    sx={{
                        paddingTop: '56px',
                        backgroundColor: 'rgb(0, 113, 15)'
                    }}
                >
                    <Card sx={{
                        borderRadius: '18px',
                        margin: '0 auto',
                        width: '74px'
                    }}>
                        <CardMedia
                            component="img"
                            height="74px"
                            image="img/logo.png"
                            alt="logo"
                            sx={{ cursor: 'pointer' }}
                        />
                    </Card>
                    <Typography
                        align="center"
                        variant="subtitle1"
                        style={{
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: '32px',
                            color: 'white',
                            fontWeight: '600',
                            paddingtop: '24px',
                            paddingBottom: '32px',
                            cursor: 'pointer',
                        }}
                    >
                        Money Lover
                    </Typography>
                    <Box
                        sx={{
                            width: '40%', margin: '0 auto',
                            backgroundColor: 'white',
                            paddingTop: '42px',
                            borderTopLeftRadius: '20px',
                            borderTopRightRadius: '20px'
                        }}
                    >
                        <Typography
                            align='center'
                            style={{
                                fontFamily: 'Roboto, sans-serif',
                                fontWeight: '700',
                                fontSize: '32px',
                                fontStyle: 'normal',
                                lineHeight: '48px'
                            }}
                        >
                            Log In
                        </Typography>
                    </Box>
                </Box>
                <Box
                    sx={{
                        backgroundColor: 'rgb(235, 235, 235)',
                        paddingBottom: '44px'
                    }}
                >
                    <Box
                        sx={{
                            width: '40%', margin: '0 auto',
                            backgroundColor: 'white',
                            borderBottomLeftRadius: '20px',
                            borderBottomRightRadius: '20px',
                            paddingBottom: '40px'
                        }}
                    >
                        <Grid container sx={{
                            display: 'flex',
                        }}>
                            <Grid
                                item xs={6}

                            >
                                <Box
                                    sx={{
                                        marginLeft: '42px',
                                        marginRight: '16px'
                                    }}
                                >
                                    <Typography
                                        mt={4}
                                        mb={2}
                                        style={{
                                            fontFamily: 'Roboto, sans-serif',
                                            fontWeight: '400',
                                            fontSize: '16px',
                                            fontStyle: 'normal',
                                            lineHeight: '24px',
                                            color: 'rgb(112, 112, 135)'
                                        }}
                                    >
                                        Using social networking accounts
                                    </Typography>
                                    <Box
                                        sx={{
                                            cursor: 'pointer',
                                            marginBottom: '14px'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                padding: '10px 10px',
                                                borderRadius: '6px',
                                                alignItems: 'center',
                                                color: 'rgb(250, 93, 93)',
                                                border: '2px solid rgb(250, 93, 93)',
                                                '&:hover': {
                                                    backgroundColor: 'rgb(250, 93, 93)',
                                                    color: 'white',
                                                },
                                            }}
                                        >
                                            <GoogleIcon fontSize='small'
                                                sx={{
                                                    paddingRight: '12px'
                                                }}
                                            />
                                            <Typography
                                                style={{
                                                    fontFamily: 'Roboto, sans-serif',
                                                    fontWeight: '500',
                                                    fontSize: '16px',
                                                    fontStyle: 'normal',
                                                    lineHeight: '19px'
                                                }}
                                            >
                                                Connect with Google
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            cursor: 'pointer',
                                            marginBottom: '14px'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                padding: '10px 10px',
                                                borderRadius: '6px',
                                                alignItems: 'center',
                                                color: 'rgb(24, 120, 242)',
                                                border: '2px solid rgb(24, 120, 242)',
                                                '&:hover': {
                                                    backgroundColor: 'rgb(24, 120, 242)',
                                                    color: 'white',
                                                },
                                            }}
                                        >
                                            <FacebookIcon fontSize='small'
                                                sx={{
                                                    paddingRight: '12px'
                                                }}
                                            />
                                            <Typography
                                                style={{
                                                    fontFamily: 'Roboto, sans-serif',
                                                    fontWeight: '500',
                                                    fontSize: '16px',
                                                    fontStyle: 'normal',
                                                    lineHeight: '19px'
                                                }}
                                            >
                                                Connect with Facebook
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            cursor: 'pointer',
                                            marginBottom: '14px'
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                padding: '10px 10px',
                                                borderRadius: '6px',
                                                alignItems: 'center',
                                                color: 'rgb(0, 0, 0)',
                                                border: '2px solid rgb(0, 0, 0)',
                                                '&:hover': {
                                                    backgroundColor: 'rgb(0, 0, 0)',
                                                    color: 'white',
                                                },
                                            }}
                                        >
                                            <AppleIcon fontSize='small'
                                                sx={{
                                                    paddingRight: '12px'
                                                }}
                                            />
                                            <Typography
                                                style={{
                                                    fontFamily: 'Roboto, sans-serif',
                                                    fontWeight: '500',
                                                    fontSize: '16px',
                                                    fontStyle: 'normal',
                                                    lineHeight: '19px'
                                                }}
                                            >
                                                Sign in with Apple
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item xs={6}>
                                <Box
                                    sx={{
                                        marginLeft: '42px',
                                        marginRight: '16px',
                                    }}
                                >
                                    <Typography
                                        mt={4}
                                        mb={2}
                                        style={{
                                            fontFamily: 'Roboto, sans-serif',
                                            fontWeight: '400',
                                            fontSize: '16px',
                                            fontStyle: 'normal',
                                            lineHeight: '24px',
                                            color: 'rgb(112, 112, 135)'
                                        }}
                                    >
                                        Using social networking accounts
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{ marginRight: '26px' }}
                                >
                                    <form>
                                        <Box mb={3}>
                                            <TextField
                                                placeholder='Email'
                                                fullWidth
                                                color='success'
                                            />
                                        </Box>
                                        <TextField
                                            placeholder='password'
                                            fullWidth
                                            color='success'
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment >
                                                        <IconButton>
                                                            <LockIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <Typography
                                            mb={2}
                                            mt={1}
                                            align='right'
                                            style={{
                                                fontFamily: 'Roboto, sans-serif',
                                                fontWeight: '400',
                                                fontSize: '16px',
                                                fontStyle: 'normal',
                                                lineHeight: '24px',
                                            }}
                                            sx={{
                                                color: 'rgb(0, 188, 42)',
                                                '&:hover': {
                                                    color: 'rgb(0, 113, 15)'
                                                },
                                            }}
                                        >
                                            Forgot Password
                                        </Typography>
                                        <Button
                                            style={{
                                                width: '100%',
                                                padding: '10px 0',
                                                borderRadius: '10px',
                                                border: '1px solid white',
                                                fontFamily: 'Roboto, sans-serif',
                                                fontWeight: '500',
                                                fontSize: '16px',
                                                fontStyle: 'normal',
                                                lineHeight: 'normal',
                                            }}
                                            sx={{
                                                backgroundColor: 'rgb(0, 188, 42)',
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: 'rgb(0, 113, 15)',
                                                    color: 'white',
                                                },
                                            }}
                                        >
                                            LOGIN
                                        </Button>
                                    </form>
                                    <Typography
                                        mt={2}
                                        align='center'
                                    >
                                        Don’t have an account? &nbsp;
                                        <Link
                                            href='/register'
                                            sx={{
                                                cursor: 'pointer',
                                                color: 'rgb(0, 188, 42)',
                                                '&:hover': {
                                                    color: 'rgb(0, 113, 15)',
                                                },
                                            }}
                                        >
                                            Register
                                        </Link>
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default LogIn;