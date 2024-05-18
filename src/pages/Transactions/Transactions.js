import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import BreadcrumbsComponent from '../../components/BreadcrubsComponent/BreadcrumbsComponent';
import { bgGray, hoverGreen, primary, textGrey } from "../../const/constCSS";

import { useDispatch, useSelector } from 'react-redux';
import { selectorToggle, selectorTransactions } from '../../selector';
import { toggleIsOpenUpdateSpending, toggleRevenue, toggleSpending } from '../../redux/slices/toggleSlice';
import ModalAddRevenue from '../../components/AddRevenue/AddRevenue';
import ModalExtraSpending from '../../components/ExtraSpending/ExtraSpending';
import { CardMedia, Grid, Typography } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import WalletService from '../../services/wallet.service';
import { setRevenues, setSpendings } from '../../redux/slices/transactionsSlice';
import { getTransactionId } from '../../const/const';
import ModalUpdateSpending from '../../components/ModalUpdateSpending/ModalUpdateSpending';


function Transactions() {

    const stateToggle = useSelector(selectorToggle);
    const transactionsByRedux = useSelector(selectorTransactions);
    const listSpending = transactionsByRedux.listSpending;
    const listRevenue = transactionsByRedux.listRevenue;
    const [indSpending, setIndSpending] = useState('');

    const [isReload, setIsReload] = useState(false);
    const changeIsReload = () => {
        setIsReload(!isReload);
    }

    const dispatch = useDispatch();

    const handleOpenSpending = () => {
        dispatch(toggleSpending())
    }

    const handleCloseSpending = () => {
        dispatch(toggleSpending())
    }

    const handleOpenRevenue = () => {
        dispatch(toggleRevenue())
    }

    const handleCloseRevenue = () => {
        dispatch(toggleRevenue())
    }

    const handleDeleteSpending = (ind) => {
        console.log(listSpending[ind])
        const isConfirmed = window.confirm('Are you sure you want to delete the spend?');
        if (isConfirmed) {
            const idWallet = listSpending[ind].fields.idWallet.stringValue;
            console.log(idWallet)
            WalletService.getWallet(idWallet)
                .then(res => {
                    console.log(res)
                    console.log(res.data.fields.name)
                    WalletService.updateWallet(
                        idWallet,
                        {
                            fields: {
                                name: res.data.fields.name,
                                totalMoney: { 'integerValue': parseInt(res.data.fields.totalMoney.integerValue) + parseInt(listSpending[ind].fields.numberMoney.integerValue) },
                                currency: res.data.fields.currency,
                                img: res.data.img,
                                uid: res.data.fields.uid
                            }
                        }
                    )
                        .then(console.log('thanh cong'))
                        .catch(console.log('that bai'))
                })
                .catch(err => console.log(err))
            WalletService.deleteSpending(getTransactionId(listSpending[ind]))
                .then(() => changeIsReload())
                .catch()
        }
    }

    const handleOpenModalUpdateSpending = (ind) => {
        setIndSpending(ind);
        dispatch(toggleIsOpenUpdateSpending());
    }

    const handleCloseModalUpdateSpending = () => {
        dispatch(toggleIsOpenUpdateSpending())
    }

    const handleDeleteRevenue = (ind) => {

    }

    useEffect(() => {
        WalletService.getTransactions()
            .then(res => {
                const listTransaction = res.data.documents
                const listSpending = listTransaction.filter(transaction => (
                    transaction.fields.typeof.stringValue === "spending" &&
                    transaction.fields.uid.stringValue === JSON.parse(localStorage.getItem('userAuth')).uid
                ))
                dispatch(setSpendings(listSpending))

                const listRevenue = listTransaction.filter(transaction => (
                    transaction.fields.typeof.stringValue === "revenue" &&
                    transaction.fields.uid.stringValue === JSON.parse(localStorage.getItem('userAuth')).uid
                ))
                dispatch(setRevenues(listRevenue))
            })
    }, [isReload])



    return (
        <>
            <Box
                sx={{
                    minHeight: '100vh',
                    backgroundColor: `${bgGray}`,
                }}
            >
                <BreadcrumbsComponent />
                <Box>
                    <Button
                        onClick={handleOpenSpending}
                        sx={{
                            position: 'fixed',
                            top: '14px',
                            right: '40px',
                            zIndex: '2',
                            color: 'white',
                            backgroundColor: `${primary}`,
                            '&:hover': {
                                color: 'white',
                                backgroundColor: `${hoverGreen}`,
                            }
                        }}
                    >
                        extra spending
                    </Button>
                    <Modal
                        open={stateToggle.isOpenSpending}
                        onClose={handleCloseSpending}
                    >
                        <ModalExtraSpending changeIsReload={changeIsReload} />
                    </Modal>
                </Box>
                <Box>
                    <Button
                        onClick={handleOpenRevenue}
                        sx={{
                            position: 'fixed',
                            top: '14px',
                            right: '240px',
                            zIndex: '2',
                            color: 'white',
                            backgroundColor: `${primary}`,
                            '&:hover': {
                                color: 'white',
                                backgroundColor: `${hoverGreen}`,
                            }
                        }}
                    >
                        add revenue
                    </Button>
                    <Modal
                        open={stateToggle.isOpenRevenue}
                        onClose={handleCloseRevenue}
                    >
                        <ModalAddRevenue changeIsReload={changeIsReload} />
                    </Modal>
                </Box>
                <Box>
                    <Grid
                        container
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            position: 'absolute',
                            top: '120px'
                        }}
                    >
                        <Grid
                            xs={4}
                            item
                            sx={{
                                backgroundColor: 'white',
                                padding: '20px',
                                borderRadius: '5px'
                            }}
                        >
                            <Typography
                                sx={{
                                    margin: '20px 0',
                                    color: `${primary}`,
                                    fontSize: '20px',
                                    fontWeight: '500'
                                }}
                            >
                                Add Revenue
                            </Typography>
                            {listRevenue.length > 0 && listRevenue.map((revenue, ind) => (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '10px 0'
                                    }}
                                >
                                    <CardMedia
                                        component='img'
                                        image={revenue.fields.img.stringValue}
                                        sx={{
                                            width: '40px'
                                        }}
                                    />
                                    <Box>
                                        <Box
                                            sx={{
                                                margin: '0 20px',
                                                minWidth: '200px'
                                            }}
                                        >
                                            <Typography>
                                                {revenue.fields.numberMoney.integerValue}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: '14px',
                                                    color: `${textGrey}`
                                                }}
                                            >
                                                {revenue.fields.currency.stringValue}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Button
                                        // onClick={}
                                        sx={{
                                            color: 'white',
                                            backgroundColor: `${primary}`,
                                            '&:hover': {
                                                color: 'white',
                                                backgroundColor: `${hoverGreen}`,
                                            },
                                            margin: '0 40px'
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <DeleteIcon
                                        onClick={() => handleDeleteRevenue(ind)}
                                        sx={{
                                            margin: '0 20px',
                                            color: `${primary}`,
                                            cursor: 'pointer'
                                        }}
                                    />
                                </Box>
                            ))
                            }
                            {!listRevenue.length > 0 &&
                                <Typography
                                >
                                    No transactions!
                                </Typography>
                            }
                        </Grid>

                        <Grid
                            xs={4}
                            item
                            sx={{
                                backgroundColor: 'white',
                                padding: '20px',
                                borderRadius: '5px'
                            }}
                        >
                            <Typography
                                sx={{
                                    margin: '20px 0',
                                    color: `${primary}`,
                                    fontSize: '20px',
                                    fontWeight: '500'
                                }}
                            >
                                Extra Spending
                            </Typography>
                            {listSpending.length > 0 && listSpending.map((spending, ind) => (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '10px 0'
                                    }}
                                >
                                    <CardMedia
                                        component='img'
                                        image={spending.fields.img.stringValue}
                                        sx={{
                                            width: '40px'
                                        }}
                                    />
                                    <Box>
                                        <Box
                                            sx={{
                                                margin: '0 20px',
                                                minWidth: '200px'
                                            }}
                                        >
                                            <Typography>
                                                {spending.fields.numberMoney.integerValue}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontSize: '14px',
                                                    color: `${textGrey}`
                                                }}
                                            >
                                                {spending.fields.currency.stringValue}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Button
                                        onClick={() => handleOpenModalUpdateSpending(ind)}
                                        sx={{
                                            color: 'white',
                                            backgroundColor: `${primary}`,
                                            '&:hover': {
                                                color: 'white',
                                                backgroundColor: `${hoverGreen}`,
                                            },
                                            margin: '0 40px'
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Modal
                                        open={stateToggle.isOpenUpdateSpending}
                                        onClose={handleCloseModalUpdateSpending}
                                    >
                                        <ModalUpdateSpending indSpending={indSpending} changeIsReload={changeIsReload}/>
                                    </Modal>
                                    <DeleteIcon
                                        onClick={() => handleDeleteSpending(ind)}
                                        sx={{
                                            margin: '0 20px',
                                            color: `${primary}`,
                                            cursor: 'pointer'
                                        }}
                                    />
                                </Box>
                            ))
                            }
                            {!listSpending.length > 0 &&
                                <Typography
                                >
                                    No transactions!
                                </Typography>
                            }
                        </Grid>

                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default Transactions;