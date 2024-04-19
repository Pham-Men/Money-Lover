import Breadcrumbs from "@mui/material/Breadcrumbs";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { bgGray } from '../../const/constCSS'
import { Button, Link } from "@mui/material";

function LogOut() {

    return (
        <>
        <Box
        sx={{
            height: '100vh',
            backgroundColor: `${bgGray}`
        }}
        >
            <Breadcrumbs
                sx={{
                    backgroundColor: 'rgb(45, 184, 76)',
                    height: '64px',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Link href='/'>
                <CardMedia
                    component="img"
                    sx={{
                        height: '42px',
                        borderRadius: '10px',
                        alignContent: 'center',
                    }}
                    image='img/logo.png'
                />
                </Link>
            </Breadcrumbs>
            <CardMedia
            component='img'
            image='img/logout.png'
            sx={{
                width: '580px',
                margin: '0 auto', 
                marginTop: '28px'   
            }}
            />
            <Box
            sx={{
                width: '580px',
                margin: '0 auto',
                backgroundColor: 'white'
            }}
            >
                <Typography
                sx={{
                    color: 'rgba(51, 51, 51, 0.87)',
                    fontFamily: 'roboto, sans-serif',
                    fontSize: '24px',
                    fontWeight: '400',
                    fontStyle: 'normal',
                    lineHeight: '36px',
                    padding: '18px',
                }}
                >
                    Logout success
                </Typography>
                <Link href='/auth'>
                <Button
                sx={{
                    margin: '18px',
                    color: 'white',
                    backgroundColor: 'rgb(45, 184, 76)',
                    padding: '6px 16px',
                    '&:hover': {
                        backgroundColor: 'rgb(71, 193, 98)'
                    }
                }}
                >
                    sign in
                </Button>
                </Link>
            </Box>
        </Box>
        </>
    )
}

export default LogOut;