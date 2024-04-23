import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { bgGray } from "../../const/constCSS";
import Wallet from '../../components/Wallet/Wallet';

function MyWallets() {
    return (
        <>
            <Box
                sx={{
                    backgroundColor: `${bgGray}`,
                    height: '100vh'
                }}
            >
                <Breadcrumbs
                    sx={{
                        height: '62px',
                        backgroundColor: 'white',
                        display: 'flex',
                        alignContent: 'center'
                    }}
                >
                    <ArrowBackIcon 
                        sx={{
                            marginLeft: '80px',
                            marginRight: '36px'
                        }}
                    />
                    <Typography
                        sx={{
                            fontFamily: 'Roboto, sans-serif',
                            fontSize: '20px',
                            fontWeight: '500',
                            color: 'black',
                            style: 'normal'
                        }}
                    >
                        My Wallets
                    </Typography>
                </Breadcrumbs>
                <Wallet/>
            </Box>
        </>
    )
}

export default MyWallets;