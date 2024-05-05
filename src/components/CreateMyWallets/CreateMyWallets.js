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

const images = [
    { value: 'image', label: <img src="img/iconWallet.png" alt="Image" style={{ width: '26px' }} /> },
    { value: 'image1', label: <img src="img/icon_1.png" alt="Image 1" style={{ width: '26px' }} /> },
    { value: 'image2', label: <img src="img/icon_2.png" alt="Image 2" style={{ width: '26px' }} /> },
    { value: 'image3', label: <img src="img/icon_3.png" alt="Image 3" style={{ width: '26px' }} /> },
    { value: 'image4', label: <img src="img/icon_4.png" alt="Image 4" style={{ width: '26px' }} /> },
    { value: 'image5', label: <img src="img/icon_5.png" alt="Image 5" style={{ width: '26px' }} /> },
    { value: 'image6', label: <img src="img/icon_6.png" alt="Image 6" style={{ width: '26px' }} /> },
    { value: 'image7', label: <img src="img/icon_7.png" alt="Image 7" style={{ width: '26px' }} /> },
];

const currencys = [
    { value: 'Việt Nam Đồng', label: <img src="img/ic_currency_vnd.png" alt="Image 1" style={{ width: '26px' }} />, text: 'Việt Nam Đồng' },
    { value: 'United States Dollar', label: <img src="img/ic_currency_usd.png" alt="Image 2" style={{ width: '26px' }} />, text: 'United States Dollar' },
    { value: 'Won', label: <img src="img/ic_currency_krw.png" alt="Image 3" style={{ width: '26px' }} />, text: 'Won' },
    { value: 'Yuan Renminbi', label: <img src="img/ic_currency_cny.png" alt="Image 4" style={{ width: '26px' }} />, text: 'Yuan Renminbi' },
];

function CreateMyWallets({changeIsReload}) {

    const userAuth = useSelector(selectorAuth);
    console.log(userAuth);

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: '',
            totalMoney: '',
            currency: ''
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

    const [selectedImage, setSelectedImage] = useState('image');

    const handleChange = (event) => {
        setSelectedImage(event.target.value);
    };


    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Box
                    sx={{
                        width: '500px',
                        height: '390px',
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
                                sx={{
                                    width: '100%'
                                }}
                                labelId="image-select-label"
                                id="image-select"
                                value={selectedImage}
                                onChange={handleChange}
                            >
                                {images.map((image) => (
                                    <MenuItem key={image.value} value={image.value}>
                                        {image.label}
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
                            type='submit'
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