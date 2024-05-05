import Box from "@mui/material/Box";
import Button from '@mui/material/Button';

import { bgGray, hoverGreen, primary } from "../../const/constCSS";
import Wallet from '../../components/Wallet/Wallet';
import CreateMyWallets from '../../components/CreateMyWallets/CreateMyWallets';

import { useEffect, } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from "../../redux/slices/dataUserSlice";
import { selectorToggle, selectordataUser } from '../../selector';

import Modal from '@mui/material/Modal';
import { toggleCreateWallet, toggleTransferMoney } from '../../redux/slices/toggleSlice';
import BreadcrumbsComponent from '../../components/BreadcrubsComponent/BreadcrumbsComponent';
import TransferMoney from "../../components/TransferMoney";
import WalletService from "../../services/wallet.service";

function MyWallets() {

    const dataUser = useSelector(selectordataUser);
    const stateisOpen = useSelector(selectorToggle);

    const dispatch = useDispatch();

    const handleOpenCreateWallet = () => {
        dispatch(toggleCreateWallet())
    }

    const handleCloseCreateWallet = () => {
        dispatch(toggleCreateWallet())
    }

    const handleOpenTransferMoney = () => {
        dispatch(toggleTransferMoney())
    }

    const handleCloseTransferMoney = () => {
        dispatch(toggleTransferMoney())
    }

    useEffect(() => {

        WalletService.getWallets()
            .then(response => {
                const Wallets = response.data.documents.filter(item => (
                    item.fields.uid.stringValue === JSON.parse(localStorage.getItem('userAuth')).uid)
                )
                console.log(Wallets)
                dispatch(setUserData(Wallets));
                localStorage.setItem('dataUser', JSON.stringify(Wallets));
            })
            .catch(error => {
                console.error("Error fetching data from Firestore:", error);
            });
    }, [])

    return (
        <>
            <Box
                sx={{
                    backgroundColor: `${bgGray}`,
                    height: '100vh',
                }}
            >
                <BreadcrumbsComponent/>
                <Box>
                    <Button
                        onClick={handleOpenCreateWallet}
                        sx={{
                            zIndex: '2',
                            position: 'absolute',
                            right: '80px',
                            top: '14px',
                            backgroundColor: `${primary}`,
                            color: 'white',
                            '&:hover': {
                                backgroundColor: `${hoverGreen}`,
                                color: 'white',
                            }
                        }}
                    >
                        Add Wallet
                    </Button>
                    <Modal
                        open={stateisOpen.isOpenCreateWallet}
                        onClose={handleCloseCreateWallet}
                    >
                        <CreateMyWallets />
                    </Modal>
                </Box>
                <Box>
                    <Button
                        onClick={handleOpenTransferMoney}
                        sx={{
                            zIndex: '2',
                            position: 'absolute',
                            right: '280px',
                            top: '14px',
                            backgroundColor: `${primary}`,
                            color: 'white',
                            '&:hover': {
                                backgroundColor: `${hoverGreen}`,
                                color: 'white',
                            }
                        }}
                    >
                        transfer money
                    </Button>
                    <Modal
                        open= {stateisOpen.isOpenTransferMoney}
                        onClose={handleCloseTransferMoney}
                    >
                        <TransferMoney/>
                    </Modal>
                </Box>
                <Wallet dataUser={dataUser} />
            </Box>
        </>
    )
}

export default MyWallets;