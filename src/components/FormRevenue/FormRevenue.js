import Box from '@mui/material/Box';
import { hoverGreen, primary } from "../../const/constCSS";
import { firestoreUrl } from '../../const/const';
import { Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';

import * as Yup from 'yup';
import axios from 'axios';

function FormRevenue () {
    const dataUserLocal = JSON.parse(localStorage.getItem('dataUser'));
    console.log(dataUserLocal);

    const idWallet = dataUserLocal[0].name.split('/')[dataUserLocal[0].name.split('/').length - 1]

    const formikRevenue = useFormik({
        initialValues: {
            number: '',
            indWallet: ''
        },
        validationSchema: Yup.object({
            number: Yup
                .number()
                .typeError('Vui lòng nhập số')
                .required('Bắt buộc'),
        }),
        onSubmit: (values) => {
            console.log(values)
            axios.patch
                (
                    `${firestoreUrl}/${idWallet}`,
                    {
                        fields: {
                            name: { 'stringValue': dataUserLocal[values.indWallet].fields.name.stringValue },
                            totalMoney: { 'integerValue': ((dataUserLocal[values.indWallet].fields.totalMoney.integerValue) - (values.number)) },
                            currency: { 'stringValue': dataUserLocal[values.indWallet].fields.currency.stringValue },
                            uid: { 'stringValue': JSON.parse(localStorage.getItem('userAuth')).uid }
                        }
                    }
                )
                .then(() => {
                    axios.get(`${firestoreUrl}/${idWallet}`)
                        .then(res => {
                            // console.log(res.data)
                            dataUserLocal[values.indWallet] = res.data
                            localStorage.setItem(
                                'dataUser', JSON.stringify(dataUserLocal)
                            );
                            window.location.reload();
                            // console.log(dataUserLocal)
                        })
                        .catch(err => console.log(err))
                }
                )
                .catch(err => console.log(err))
        }
    })

    return (
        <>
            <form onSubmit={formikRevenue.handleSubmit}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'end'
                    }}
                >
                    <Box
                        sx={{
                            marginRight: '10px'
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '16px',
                                color: 'black',
                            }}
                        >
                            Number money:
                        </Typography>
                        <TextField
                            size='small'
                            onChange={formikRevenue.handleChange}
                            value={formikRevenue.values.number}
                            name='number'
                            color="success"
                            error={formikRevenue.touched.number && Boolean(formikRevenue.errors.number)}
                            helperText={formikRevenue.touched.number && formikRevenue.errors.number}
                            sx={{
                                width: '140px',
                                height: '40px',
                                '&:hover': {
                                    border: `1px solid ${primary}`,
                                    borderRadius: '4px'
                                }
                            }}
                        />
                    </Box>
                    <Box
                        sx={{
                            marginLeft: '20px'
                        }}
                    >
                        <Typography
                            style={{
                                fontSize: '16px',
                                color: 'black',
                            }}
                        >
                            Choose wallet:
                        </Typography>
                        <Select
                            sx={{
                                width: '120px',
                            }}
                            size='small'
                            value={formikRevenue.values.indWallet}
                            name='indWallet'
                            onChange={formikRevenue.handleChange}
                        >
                            {dataUserLocal.length > 0 && dataUserLocal.map((dataUserItem, ind) => (
                                <MenuItem
                                    key={ind}
                                    value={ind}
                                >
                                    {dataUserItem.fields.totalMoney.integerValue}
                                    &nbsp;
                                    {dataUserItem.fields.currency.stringValue}
                                </MenuItem>
                            ))
                            }
                            {!dataUserLocal.length > 0 && (
                                <MenuItem>
                                    Hiện không có ví
                                </MenuItem>
                            )}
                        </Select>
                    </Box>
                    <Button
                        type='submit'
                        size='small'
                        sx={{
                            width: '64px',
                            height: '40px',
                            marginLeft: '20px',
                            backgroundColor: `${primary}`,
                            color: 'white',
                            '&:hover': {
                                backgroundColor: `${hoverGreen}`,
                                color: 'white',
                            }
                        }}

                    >
                        Add
                    </Button>
                </Box>
            </form>
        </>
    )
}

export default FormRevenue;