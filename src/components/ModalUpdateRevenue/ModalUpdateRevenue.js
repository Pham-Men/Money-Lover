import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { hoverGreen, primary } from "../../const/constCSS";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { selectorTransactions } from '../../selector';
import WalletService from '../../services/wallet.service';
import { getTransactionId } from '../../const/const';
import { toggleIsOpenUpdateSpending } from '../../redux/slices/toggleSlice';

function ModalUpdateRevenue() {

    const revenues = [
        { id: '1', title: "Lương về", url: 'img/icon_8.png' },
        { id: '2', title: "Khoản thu khác", url: 'img/icon_9.png' },
    ]

    const formik = useFormik({
        initialValues: {
            img: '',
            numberMoney: '',
        },
        validationSchema: Yup.object({
            img: Yup
                .string()
                .required('Required'),
            numberMoney: Yup
                .number()
                .typeError('Please enter number')
                .required('Required'),
        }),
        onSubmit: (values) => {
            console.log(values)
        }
    })

    return (
        <>
            <Box
                sx={{
                    width: '520px',
                    height: '360px',
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
                    Update Spending
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
                                name='img'
                                value={formik.values.img}
                                error={formik.touched.img && Boolean(formik.errors.img)}
                                helperText={formik.touched.img && formik.errors.img}
                                sx={{
                                    width: '400px'
                                }}
                            >
                                {revenues.map((spending, ind) => (
                                    <MenuItem
                                        key={ind}
                                        value={spending.url}
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
                                                image={spending.url}
                                                sx={{
                                                    width: '40px',
                                                    marginRight: '20px'
                                                }}
                                            />
                                            <Typography>{spending.title}</Typography>
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
                                display: 'flex',
                                justifyContent: 'end'
                            }}
                        >
                            <Button
                                // onClick={handleCloseUpdateSpending}
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

export default ModalUpdateRevenue;