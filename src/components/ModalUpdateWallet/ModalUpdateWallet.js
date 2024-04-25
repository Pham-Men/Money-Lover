import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

import { hoverGreen, primary, textGrey } from '../../const/constCSS';

import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { toggleUpdateWallet } from '../../redux/slices/toggleSlice';

// import { firebaseConfig } from '../../config';

// import axios from 'axios';

function ModalUpdateWallet(prop) {
    // const collectionName = "my-wallet/nuvUCQTuLh1Mh63CBaQM";

    // const firestoreUrl =
    //     `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/${collectionName}`;

    const formik = useFormik({
        initialValues: {
            totalMoney: ''
        },
        onSubmit: (values) => {
            console.log(values.totalMoney)
            
        }
    })

    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(toggleUpdateWallet())
    }

    return (
        <>
            <Box
                sx={{
                    width: '496px',
                    height: '382px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    borderRadius: '8px'
                }}
            >
                <Typography
                    sx={{
                        fontFamily: 'roboto, sans-serif',
                        fontSize: '20px',
                        fontWeight: '500',
                        style: 'normal',
                        padding: '20px'
                    }}
                >
                    Adjust Balance
                </Typography>
                <Box
                    sx={{
                        padding: '20px 0',
                        display: 'flex',
                        cursor: 'pointer',
                        paddingLeft: '20px',
                    }}
                >
                    <CardMedia
                        component='img'
                        sx={{
                            height: '38px',
                            width: '38px',
                            marginRight: '20px'
                        }}
                        image='img/iconWallet.png'
                    />
                    <Box>
                        <Typography
                            sx={{
                                fontFamily: 'roboto, sans-serif',
                                fontSize: '12px',
                                fontWeight: '400',
                                color: `${textGrey}`,
                                style: 'normal',
                            }}
                        >
                            {prop.datauser.totalMoney.integerValue}
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: 'roboto, sans-serif',
                                fontSize: '14px',
                                fontWeight: '500',
                                style: 'normal',
                            }}
                        >
                            {prop.datauser.currency.stringValue}
                        </Typography>
                    </Box>
                </Box>
                <form onSubmit={formik.handleSubmit}>
                    <Box
                        sx={{
                            padding: '0 20px',
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: 'roboto, sans-serif',
                                fontSize: '12px',
                                fontWeight: '400',
                                color: `${textGrey}`,
                                style: 'normal',
                            }}
                        >
                            Enter current balance of this wallet
                        </Typography>
                        <TextField
                            onChange={formik.handleChange}
                            name='totalMoney'
                            value={formik.values.totalMoney}
                            fullWidth
                            color="success"
                            defaultValue={prop.datauser.totalMoney.integerValue}
                        />
                    </Box>
                    <Box
                        display='flex'
                        justifyContent='end'

                    >
                        <Button

                            onClick={handleClose}
                            sx={{
                                color: `${primary}`,
                                backgroundColor: 'rgb(230, 230, 230)',
                                margin: '36px',
                                '&:hover': {
                                    backgroundColor: 'rgb(216, 233, 220)',
                                    color: `${primary}`
                                }
                            }}
                        >
                            cancel
                        </Button>
                        <Button
                            sx={{
                                backgroundColor: `${primary}`,
                                color: 'white',
                                margin: '36px',
                                '&:hover': {
                                    backgroundColor: `${hoverGreen}`,
                                    color: 'white'
                                }
                            }}
                            type='submit'
                        >
                            done
                        </Button>
                    </Box>
                </form>
            </Box>
        </>
    )
}

export default ModalUpdateWallet;