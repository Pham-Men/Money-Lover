import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

import { hoverGreen, primary, textGrey } from '../../const/constCSS';

import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { toggleUpdateWallet } from '../../redux/slices/toggleSlice';
import axios from 'axios';

import { firebaseConfig } from '../../config';
import { selectordataUser } from '../../selector';
import { collectionName } from '../../const/const';

function ModalUpdateWallet(prop) {
    console.log(prop)
    const dataUser = useSelector(selectordataUser);
    console.log(dataUser)

    // const idWallet = prop.data.name
    const url = prop.dataUser.name;
    const length = url.split('/').length;
    const idWallet = url.split('/')[length-1]

    const dispatch = useDispatch();

    const firestoreUrl =
        `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/${collectionName}/${idWallet}`;

    const formik = useFormik({
        initialValues: {
            totalMoney: ''
        },
        onSubmit: (values) => {
            console.log(values.totalMoney)
            axios.patch(firestoreUrl, {
                fields: {
                    name: { 'stringValue': dataUser.data[0].fields.name.stringValue },
                    totalMoney: { 'integerValue': values.totalMoney },
                    currency: { 'stringValue': dataUser.data[0].fields.currency.stringValue },
                    uid: {'stringValue': JSON.parse(localStorage.getItem('userAuth')).uid}
                }
            })
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
            window.location.reload();
        }
    })


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
                            {prop.dataUser.fields.totalMoney.integerValue}
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: 'roboto, sans-serif',
                                fontSize: '14px',
                                fontWeight: '500',
                                style: 'normal',
                            }}
                        >
                            {prop.dataUser.fields.currency.stringValue}
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
                            defaultValue={prop.dataUser.fields.totalMoney.integerValue}
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