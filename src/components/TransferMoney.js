import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { hoverGreen, primary } from '../const/constCSS';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';

function TransferMoney() {
    const dataUserLocal = JSON.parse(localStorage.getItem('dataUser'));
    console.log(dataUserLocal)

    const formik = useFormik({
        initialValues: {
            moneyOut: '',
            moneyIn: ''
        },
        onSubmit: (values) => {
            console.log(values)
        }
    })

    return (
        <>
            <Box
                sx={{
                    width: '500px',
                    height: '160px',
                    border: '1px solid black',
                    margin: '110px auto',
                    borderRadius: '4px',
                    backgroundColor: 'white'
                }}
            >
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
                            name='moneyOut'
                            value={formik.values.moneyOut}
                            size='small'
                            sx={{
                                width: '160px'
                            }}
                        >
                            {dataUserLocal.map(itemDateUser => (
                                <MenuItem
                                    value={itemDateUser.name.split('/')[dataUserLocal[0].name.split('/').length - 1]}
                                >
                                    {itemDateUser.fields.totalMoney.integerValue}
                                    &nbsp;
                                    {itemDateUser.fields.currency.stringValue}
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
                            name='moneyIn'
                            value={formik.values.moneyIn}
                            size='small'
                            sx={{
                                width: '160px'
                            }}
                        >
                            {dataUserLocal.map(itemDateUser => (
                                <MenuItem
                                    value={itemDateUser.name.split('/')[dataUserLocal[0].name.split('/').length - 1]}
                                >
                                    {itemDateUser.fields.totalMoney.integerValue}
                                    &nbsp;
                                    {itemDateUser.fields.currency.stringValue}
                                </MenuItem>
                            ))}
                        </Select>
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