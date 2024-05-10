import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { hoverGreen, primary } from '../const/constCSS';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { selectorWallets } from '../selector';
import { TextField, Typography } from '@mui/material';

import * as Yup from 'yup';
import WalletService from '../services/wallet.service';
import { toggleTransferMoney } from '../redux/slices/toggleSlice';

function TransferMoney({changeIsReload}) {

    // console.log(changeIsReload)

    const wallets = useSelector(selectorWallets);

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            idWalletOut: '',
            idWalletIn: '',
            number: ''
        },
        validationSchema: Yup.object({
            idWalletOut: Yup
                .string()
                .required('Required'),
            idWalletIn: Yup
                .string()
                .required('Required'),
            number: Yup
                .number()
                .typeError('Please enter number')
                .required('Required'),
        }),
        onSubmit: (values) => {
            console.log(values)
            const walletOut = wallets.dataWallets.filter(
                wallet => (wallet.name.split('/')[wallet.name.split('/').length - 1] === values.idWalletOut)
            )
            const walletIn = wallets.dataWallets.filter(
                wallet => (wallet.name.split('/')[wallet.name.split('/').length - 1] === values.idWalletIn)
            )
            console.log(walletOut)
            if (walletOut[0].fields.totalMoney.integerValue - values.number < 0) {
                alert('Not enough money')
            } else {
                WalletService.updateWallet(
                    values.idWalletOut,
                    {
                        fields: {
                            name: { 'stringValue': walletOut[0].fields.name.stringValue },
                            totalMoney: { 'integerValue': walletOut[0].fields.totalMoney.integerValue - values.number },
                            currency: { 'stringValue': walletOut[0].fields.currency.stringValue },
                            img: { 'stringValue': walletOut[0].fields.img.stringValue },
                            // uid: { 'stringValue': JSON.parse(localStorage.getItem('userAuth')).uid }
                            uid: { 'arrayValue': { 'values': [{ 'stringValue': JSON.parse(localStorage.getItem('userAuth')).uid }] } }
                        }
                    }
                )
                    .then(() => { })
                    .catch(err => console.log(err))
                    changeIsReload()

                WalletService.updateWallet(
                    values.idWalletIn,
                    {
                        fields: {
                            name: { 'stringValue': walletIn[0].fields.name.stringValue },
                            totalMoney: { 'integerValue': parseInt(walletIn[0].fields.totalMoney.integerValue) + parseInt(values.number) },
                            currency: { 'stringValue': walletIn[0].fields.currency.stringValue },
                            img: { 'stringValue': walletIn[0].fields.img.stringValue },
                            // uid: { 'stringValue': JSON.parse(localStorage.getItem('userAuth')).uid }
                            uid: { 'arrayValue': { 'values': [{ 'stringValue': JSON.parse(localStorage.getItem('userAuth')).uid }] } }
                        }
                    }
                )
                    .then(() => {})
                    .catch(err => console.log(err))

                dispatch(toggleTransferMoney())
                changeIsReload()
            }
            changeIsReload()
        }
    })

    return (
        <>
            <Box
                sx={{
                    width: '500px',
                    height: '360px',
                    border: '1px solid black',
                    margin: '110px auto',
                    borderRadius: '4px',
                    backgroundColor: 'white'
                }}
            >
                <Typography
                    sx={{
                        fontSize: '20px',
                        color: `${primary}`,
                        margin: '40px'
                    }}
                >
                    Transfer Money
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            marginTop: '30px'
                        }}
                    >
                        <Select
                            onChange={formik.handleChange}
                            name='idWalletOut'
                            value={formik.values.idWalletOut}
                            error={formik.touched.idWalletOut && Boolean(formik.errors.idWalletOut)}
                            helperText={formik.touched.idWalletOut && formik.errors.idWalletOut}
                            size='small'
                            sx={{
                                width: '160px'
                            }}
                        >
                            {wallets.dataWallets.map(wallet => (
                                <MenuItem
                                    value={wallet.name.split('/')[wallet.name.split('/').length - 1]}
                                >
                                    {wallet.fields.totalMoney.integerValue}
                                    &nbsp;
                                    {wallet.fields.currency.stringValue}
                                </MenuItem>
                            ))}
                        </Select>
                        <ArrowForwardIcon
                            sx={{
                                color: `${primary}`,
                                margin: '0 10px'
                            }}
                        />
                        <Select
                            onChange={formik.handleChange}
                            name='idWalletIn'
                            value={formik.values.idWalletIn}
                            error={formik.touched.idWalletIn && Boolean(formik.errors.idWalletIn)}
                            helperText={formik.touched.idWalletIn && formik.errors.idWalletIn}
                            size='small'
                            sx={{
                                width: '160px'
                            }}
                        >
                            {wallets.dataWallets.filter((wallet) => (
                                wallet.name.split('/')[wallet.name.split('/').length - 1] !== formik.values.idWalletOut
                            )).map(idWalletIn => (
                                <MenuItem
                                    value={idWalletIn.name.split('/')[idWalletIn.name.split('/').length - 1]}
                                >
                                    {idWalletIn.fields.totalMoney.integerValue}
                                    &nbsp;
                                    {idWalletIn.fields.currency.stringValue}
                                </MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <Box
                        sx={{
                            margin: '20px 36px',
                            display: 'flex'
                        }}
                    >
                        <Typography
                            sx={{
                                width: '350px'
                            }}
                        >
                            Number money:
                        </Typography>
                        <TextField
                            fullWidth
                            onChange={formik.handleChange}
                            value={formik.values.number}
                            name='number'
                            size='small'
                            error={formik.touched.number && Boolean(formik.errors.number)}
                            helperText={formik.touched.number && formik.errors.number}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'end',
                            paddingRight: '34px',
                            marginTop: '30px'
                        }}
                    >
                        <Button
                            disabled={!formik.isValid}
                            type='submit'
                            sx={{
                                backgroundColor: `${primary}`,
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: `${hoverGreen}`,
                                    color: 'white',
                                }
                            }}
                        >
                            done
                        </Button>
                    </Box>
                </form>
            </Box>
        </>
    )
}

export default TransferMoney;