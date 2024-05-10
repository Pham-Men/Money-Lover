import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { hoverGreen, primary } from "../../const/constCSS";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectorWallets } from '../../selector';
import WalletService from '../../services/wallet.service';
import { useNavigate } from 'react-router-dom';
import { setWalletsToRedux } from '../../redux/slices/walletsSlice';
import { toggleRevenue } from '../../redux/slices/toggleSlice';

function ModalAddRevenue() {

    const walletsByRedux = useSelector(selectorWallets);

    const naviagte = useNavigate();
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            category: '',
            numberMoney: '',
            idWallet: ''
        },
        validationSchema: Yup.object({
            category: Yup
                .string()
                .required('Required'),
            numberMoney: Yup
                .number()
                .typeError('Please enter number')
                .required('Required'),
            idWallet: Yup
                .string()
                .required('Required'),
        }),
        onSubmit: (values) => {
            console.log(values)
            WalletService.getWallet(values.idWallet)
                .then((res) => {
                    const newTotalMoney = parseInt(res.data.fields.totalMoney.integerValue) + parseInt(values.numberMoney);
                    WalletService.updateWallet(
                        values.idWallet,
                        {
                            fields: {
                                name: { 'stringValue': res.data.fields.name.stringValue },
                                totalMoney: { 'integerValue': newTotalMoney },
                                currency: { 'stringValue': res.data.fields.currency.stringValue },
                                img: { 'stringValue': res.data.fields.img.stringValue },
                                uid: { 'arrayValue': { 'values': [{ 'stringValue': JSON.parse(localStorage.getItem('userAuth')).uid }] } }
                            }
                        }
                    )
                        .then(() => {
                            WalletService.getWallets()
                                .then(response => {
                                    const wallets = response.data.documents.filter(item => (
                                        item.fields.uid.arrayValue.values.stringValue === JSON.parse(localStorage.getItem('userAuth')).uid)
                                    )
                                    dispatch(setWalletsToRedux(wallets))
                                })
                                .catch(error => {
                                    console.error(error);
                                });
                            naviagte('/my-wallets')
                        })
                        .catch(err => console.log(err))
                })
        }
    });

    const handleCloseRevenue = () => {
        dispatch(toggleRevenue())
    }

    const revenues = [
        { id: '1', title: "Lương về", url: 'img/icon_8.png' },
        { id: '2', title: "Khoản thu khác", url: 'img/icon_9.png' },
    ]

    return (
        <>
            <Box
                sx={{
                    width: '520px',
                    height: '440px',
                    border: '1px solid black',
                    borderRadius: '4px',
                    backgroundColor: 'white',
                    position: 'absolute',
                    top: '110px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}
            >
                <Typography
                    sx={{
                        fontSize: '20px',
                        color: `${primary}`,
                        margin: '50px'
                    }}
                >
                    Revenue
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Box
                        sx={{
                            margin: '50px'
                        }}
                    >
                        <Box
                            sx={{
                                marginBottom: '20px',
                                display: 'flex'
                            }}
                        >
                            <Typography
                                sx={{
                                    width: '220px',
                                    fontSize: '16px',
                                    fontWeight: '500'
                                }}
                            >
                                Category:
                            </Typography>
                            <Select
                                onChange={formik.handleChange}
                                name='category'
                                value={formik.values.category}
                                error={formik.touched.category && Boolean(formik.errors.category)}
                                helperText={formik.touched.category && formik.errors.category}
                                sx={{
                                    width: '400px'
                                }}
                            >
                                {revenues.map((revenue, ind) => (
                                    <MenuItem
                                        key={ind}
                                        value={revenue.title}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <CardMedia
                                                component='img'
                                                image={revenue.url}
                                                sx={{
                                                    width: '40px',
                                                    marginRight: '20px'
                                                }}
                                            />
                                            <Typography>{revenue.title}</Typography>
                                        </Box>
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                        <Box
                            sx={{
                                marginBottom: '20px',
                                display: 'flex'
                            }}
                        >
                            <Typography
                                sx={{
                                    width: '220px',
                                    fontSize: '16px',
                                    fontWeight: '500'
                                }}
                            >
                                Number Money:
                            </Typography>
                            <TextField
                                fullWidth
                                onChange={formik.handleChange}
                                name='numberMoney'
                                value={formik.values.numberMoney}
                                error={formik.touched.numberMoney && Boolean(formik.errors.numberMoney)}
                                helperText={formik.touched.numberMoney && formik.errors.numberMoney}
                                sx={{

                                }}
                            />
                        </Box>
                        <Box
                            sx={{
                                marginBottom: '20px',
                                display: 'flex'
                            }}
                        >
                            <Typography
                                sx={{
                                    width: '220px',
                                    fontSize: '16px',
                                    fontWeight: '500'
                                }}
                            >
                                Choose Wallet:
                            </Typography>
                            <Select
                                onChange={formik.handleChange}
                                name='idWallet'
                                value={formik.values.idWallet}
                                error={formik.touched.idWallet && Boolean(formik.errors.idWallet)}
                                helperText={formik.touched.idWallet && formik.errors.idWallet}
                                sx={{
                                    width: '400px'
                                }}
                            >
                                {walletsByRedux.dataWallets.length > 0 && (walletsByRedux.dataWallets.map((wallet, ind) => (
                                    <MenuItem
                                        key={ind}
                                        value={wallet.name.split('/')[wallet.name.split('/').length - 1]}
                                        sx={{
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontSize: '16px',
                                                    color: `${primary}`
                                                }}
                                            >
                                                {wallet.fields.totalMoney.integerValue}
                                            </Typography>
                                            &nbsp;
                                            <Typography
                                                sx={{
                                                    fontSize: '12px'
                                                }}
                                            >
                                                {wallet.fields.currency.stringValue}
                                            </Typography>
                                        </Box>
                                    </MenuItem>
                                )))}
                            </Select>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'end'
                            }}
                        >
                            <Button
                                onClick={handleCloseRevenue}
                                sx={{
                                    color: `${primary}`,
                                    backgroundColor: 'rgb(230, 230, 230)',
                                    marginRight: '36px',
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
                                type='submit'
                                sx={{
                                    color: 'white',
                                    backgroundColor: `${primary}`,
                                    '&:hover': {
                                        color: 'white',
                                        backgroundColor: `${hoverGreen}`,
                                    }
                                }}
                            >
                                done
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Box>
        </>
    )
}

export default ModalAddRevenue;