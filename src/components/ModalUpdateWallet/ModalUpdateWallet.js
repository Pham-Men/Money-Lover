import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

import { hoverGreen, primary, textGrey } from '../../const/constCSS';

import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { toggleUpdateWallet } from '../../redux/slices/toggleSlice';
import WalletService from '../../services/wallet.service';

import * as Yup from 'yup';



function ModalUpdateWallet({ dataUser, changeIsReload, changeDisplayDetailWallet }) {

    const url = dataUser.name;
    const length = url.split('/').length;
    const idWallet = url.split('/')[length - 1]

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            totalMoney: ''
        },
        validationSchema: Yup.object({
            totalMoney: Yup
                .number()
                .typeError('Please enter number')
                .required('Required'),
        }),
        onSubmit: (values) => {
            WalletService.updateWallet(
                idWallet,
                {
                    fields: {
                        name: { 'stringValue': dataUser.fields.name.stringValue },
                        totalMoney: { 'integerValue': values.totalMoney },
                        currency: { 'stringValue': dataUser.fields.currency.stringValue },
                        img: { 'stringValue': dataUser.fields.img.stringValue },
                        uid: { 'stringValue': JSON.parse(localStorage.getItem('userAuth')).uid }
                    }
                }
            )
                .then(() => {
                    dispatch(toggleUpdateWallet());
                    changeIsReload();
                    changeDisplayDetailWallet();
                })
                .catch(err => console.log(err))
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
                        image={dataUser.fields.img.stringValue}
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
                            {dataUser.fields.totalMoney.integerValue}
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: 'roboto, sans-serif',
                                fontSize: '14px',
                                fontWeight: '500',
                                style: 'normal',
                            }}
                        >
                            {dataUser.fields.currency.stringValue}
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
                            defaultValue={dataUser.fields.totalMoney.integerValue}
                            error={formik.touched.totalMoney && Boolean(formik.errors.totalMoney)}
                            helperText={formik.touched.totalMoney && formik.errors.totalMoney}
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
                            disabled={!formik.isValid}
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