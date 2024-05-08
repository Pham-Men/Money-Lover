import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button'

import { useState } from 'react';

import { hoverGreen, primary } from '../../const/constCSS';
import { useFormik } from 'formik';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { selectorAuth } from '../../selector';
import { firestoreUrl } from '../../const/const';
import { toggleCreateWallet } from '../../redux/slices/toggleSlice';

import * as Yup from 'yup';
import { CardMedia } from '@mui/material';

const images = [
    { id: '1', title: "Sức khỏe", url: 'img/icon_1.png' },
    { id: '2', title: "Ăn uống", url: 'img/icon_2.png' },
    { id: '3', title: "Siêu thị", url: 'img/icon_3.png' },
    { id: '4', title: "Học tập", url: 'img/icon_4.png' },
    { id: '5', title: "Máy bay", url: 'img/icon_5.png' },
    { id: '6', title: "Xem phim", url: 'img/icon_6.png' },
    { id: '7', title: "Đi chợ", url: 'img/icon_7.png' },
];

const currencys = [
    { value: 'Việt Nam Đồng', label: <img src="img/ic_currency_vnd.png" alt="Image 1" style={{ width: '26px' }} />, text: 'Việt Nam Đồng' },
    { value: 'United States Dollar', label: <img src="img/ic_currency_usd.png" alt="Image 2" style={{ width: '26px' }} />, text: 'United States Dollar' },
    { value: 'Won', label: <img src="img/ic_currency_krw.png" alt="Image 3" style={{ width: '26px' }} />, text: 'Won' },
    { value: 'Yuan Renminbi', label: <img src="img/ic_currency_cny.png" alt="Image 4" style={{ width: '26px' }} />, text: 'Yuan Renminbi' },
];

function CreateMyWallets({ changeIsReload }) {

    const userAuth = useSelector(selectorAuth);
    console.log(userAuth);

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: '',
            totalMoney: '',
            currency: '',
            img: ''
        },
        validationSchema: Yup.object({
            name: Yup
                .string()
                .required('Required'),
            totalMoney: Yup
                .number()
                .typeError('Please enter number')
                .required('Required'),
            currency: Yup
                .string()
                .required('Required'),
            img: Yup
                .string()
                .required('Required'),
        }),
        onSubmit: (values) => {
            console.log(values)
            axios.post
                (
                    firestoreUrl,
                    {
                        fields: {
                            name: { 'stringValue': values.name },
                            totalMoney: { 'integerValue': values.totalMoney },
                            currency: { 'stringValue': values.currency },
                            img: { 'stringValue': values.img },
                            uid: { 'stringValue': JSON.parse(localStorage.getItem('userAuth')).uid }
                        }
                    }
                )
                .then(() => {
                    dispatch(toggleCreateWallet());
                    changeIsReload();
                })
                .catch(error => {
                    console.error(error);
                });
        }
    })

    const handleCloseCreateWallet = () => {
        dispatch(toggleCreateWallet())
    }


    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Box
                    sx={{
                        width: '500px',
                        height: '440px',
                        border: '1px solid black',
                        margin: '110px auto',
                        borderRadius: '4px',
                        padding: '22px',
                        backgroundColor: 'white'
                    }}
                >
                    <Box>
                        <Typography
                            sx={{
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: '20px',
                                fontWeight: '500',
                                color: 'black',
                                style: 'normal',
                                marginBottom: '22px'
                            }}
                        >
                            Add a wallet first!
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            margin: '16px 0'
                        }}
                    >
                        <Box
                            sx={{
                                width: '16%',
                                height: '32px',
                                marginRight: '16px'
                            }}
                        >
                            <Select
                                onChange={formik.handleChange}
                                name='img'
                                value={formik.values.img}
                                error={formik.touched.img && Boolean(formik.errors.img)}
                                helperText={formik.touched.img && formik.errors.img}
                                sx={{
                                    width: '100%'
                                }}
                            >
                                {images.map((image) => (
                                    <MenuItem key={image.id} value={image.url}>
                                        <CardMedia
                                            component='img'
                                            image={image.url}
                                            sx={{
                                                width: '26px'
                                            }}
                                        />
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                        <Box
                            sx={{
                                width: '80%',
                            }}
                        >
                            <TextField
                                onChange={formik.handleChange}
                                name='name'
                                value={formik.values.name}
                                placeholder='Your wallet name'
                                fullWidth
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            marginBottom: '16px'
                        }}
                    >
                        <Box
                            sx={{
                                width: '60%',
                                height: '32px',
                                marginRight: '16px'
                            }}
                        >
                            <Select
                                sx={{
                                    width: '100%'
                                }}
                                name='currency'
                                value={formik.values.currency}
                                onChange={formik.handleChange}
                                error={formik.touched.currency && Boolean(formik.errors.currency)}
                                helperText={formik.touched.currency && formik.errors.currency}
                            >
                                {currencys.map((currency) => (
                                    <MenuItem key={currency.value} value={currency.value}>
                                        {currency.label} {currency.text}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                        <TextField
                            onChange={formik.handleChange}
                            name='totalMoney'
                            value={formik.values.totalMoney}
                            sx={{ width: '40%' }}
                            placeholder='initial Balance'
                            error={formik.touched.totalMoney && Boolean(formik.errors.totalMoney)}
                            helperText={formik.touched.totalMoney && formik.errors.totalMoney}
                        />
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        marginTop: '32px'
                    }}>
                        <Box>
                            <Checkbox
                                color="success"
                            />
                        </Box>
                        <Box
                            sx={{ marginLeft: '16px' }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: 'Roboto, sans-serif',
                                    fontSize: '14px',
                                    fontWeight: '400',
                                    color: 'black',
                                    style: 'normal'
                                }}
                            >
                                Excluded from Total
                            </Typography>
                            <Typography
                                sx={{
                                    fontFamily: 'Roboto, sans-serif',
                                    fontSize: '12px',
                                    fontWeight: '400',
                                    color: 'black',
                                    style: 'normal'
                                }}
                            >
                                Ignore this wallet and its balance in the "Total" mode.
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'end'
                        }}
                    >
                        <Button
                            onClick={handleCloseCreateWallet}
                            sx={{
                                marginTop: '36px',
                                padding: '6px 12px',
                                color: `${primary}`,
                                backgroundColor: 'rgb(230, 230, 230)',
                                marginRight: '36px',
                                fontFamily: 'roboto, sans-serif',
                                fontSize: '14px',
                                fontWeight: '400',
                                style: 'normal',
                                '&:hover': {
                                    backgroundColor: 'rgb(216, 233, 220)',
                                    color: `${primary}`
                                }
                            }}
                        >
                            cancel

                        </Button>
                        <Button
                            type='submit'
                            disabled={!formik.isValid}
                            sx={{
                                marginTop: '36px',
                                padding: '6px 12px',
                                backgroundColor: `${primary}`,
                                color: 'white',
                                fontFamily: 'roboto, sans-serif',
                                fontSize: '14px',
                                fontWeight: '400',
                                style: 'normal',
                                '&:hover': {
                                    backgroundColor: `${hoverGreen}`,
                                    color: 'white'
                                }
                            }}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </form>
        </>
    )
}

export default CreateMyWallets;