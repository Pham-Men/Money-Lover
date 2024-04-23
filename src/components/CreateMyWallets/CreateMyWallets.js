import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button'

import { useState } from 'react';

import { hoverGreen, primary } from '../../const/constCSS';

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
    { value: 'image1', label: <img src="img/ic_currency_vnd.png" alt="Image 1" style={{ width: '26px' }} />, text: 'Việt Nam Đồng' },
    { value: 'image2', label: <img src="img/ic_currency_usd.png" alt="Image 2" style={{ width: '26px' }} />, text: 'United States Dollar' },
    { value: 'image3', label: <img src="img/ic_currency_krw.png" alt="Image 3" style={{ width: '26px' }} />, text: 'Won' },
    { value: 'image4', label: <img src="img/ic_currency_cny.png" alt="Image 4" style={{ width: '26px' }} />, text: 'Yuan Renminbi' },
];
function CreateMyWallets() {

    const [selectedImage, setSelectedImage] = useState('image');

    const handleChange = (event) => {
        setSelectedImage(event.target.value);
    };

    const [selectedCurremcy, setSelectedcurrency] = useState('image1');

    const handleChangeCurrency = (event) => {
        setSelectedcurrency(event.target.value);
    };

    return (
        <>
            <form>
                <Box
                    sx={{
                        width: '500px',
                        height: '390px',
                        border: '1px solid black',
                        margin: '110px auto',
                        borderRadius: '4px',
                        padding: '22px'
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
                            <TextField placeholder='Your wallet name' fullWidth />
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
                                labelId="image-select-label"
                                id="image-select"
                                value={selectedCurremcy}
                                onChange={handleChangeCurrency}
                            >
                                {currencys.map((currency) => (
                                    <MenuItem key={currency.value} value={currency.value}>
                                        {currency.label} {currency.text}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                        <TextField 
                        sx={{ width: '40%' }} 
                        placeholder='initial Balance'
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