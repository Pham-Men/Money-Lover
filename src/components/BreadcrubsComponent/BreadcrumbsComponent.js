import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from '@mui/material/Box';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

function BreadcrumbsComponent() {
    const navigate = useNavigate();

    const toHome = () => {
        navigate('/')
    }
    return (
        <>
            <Breadcrumbs
                sx={{
                    zIndex: '1',
                    position: 'fixed',
                    top: '0',
                    right: '0',
                    left: '0',
                    height: '62px',
                    backgroundColor: 'white',
                }}
            >
                <Box
                    onClick={toHome}
                    sx={{
                        height: '62px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center'
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
                        Home
                    </Typography>
                </Box>
            </Breadcrumbs>
        </>
    )
}

export default BreadcrumbsComponent;