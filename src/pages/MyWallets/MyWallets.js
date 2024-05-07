import Box from "@mui/material/Box";
import Button from '@mui/material/Button';

import { bgGray, hoverGreen, primary } from "../../const/constCSS";
import Wallet from '../../components/Wallet/Wallet';
import CreateMyWallets from '../../components/CreateMyWallets/CreateMyWallets';

import { useEffect, useState, } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { selectorToggle, selectorWallets } from '../../selector';

import Modal from '@mui/material/Modal';
import { toggleCreateWallet, toggleTransferMoney } from '../../redux/slices/toggleSlice';
import BreadcrumbsComponent from '../../components/BreadcrubsComponent/BreadcrumbsComponent';
import TransferMoney from "../../components/TransferMoney";
import WalletService from "../../services/wallet.service";
import { setWalletsToRedux } from "../../redux/slices/walletsSlice";

function MyWallets() {

    const walletsByRedux = useSelector(selectorWallets);
    console.log(walletsByRedux);

    const [isReload, setIsReload] = useState(false);

    const handleReload = () => {
        setIsReload(!isReload);
    };

    // const [wallets, setWallets] = useState([]);
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
                const wallets = response.data.documents.filter(item => (
                    item.fields.uid.stringValue === JSON.parse(localStorage.getItem('userAuth')).uid)
                )
                dispatch(setWalletsToRedux(wallets))
            })
            .catch(error => {
                console.error(error);
            });
    }, [isReload])

    return (
        <>
            <Box
                sx={{
                    backgroundColor: `${bgGray}`,
                    minHeight: '100vh'
                }}
            >
                <BreadcrumbsComponent />
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
                        <CreateMyWallets changeIsReload={handleReload}/>
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
                        open={stateisOpen.isOpenTransferMoney}
                        onClose={handleCloseTransferMoney}
                    >
                        <TransferMoney />
                    </Modal>
                </Box>
                <Wallet wallets={walletsByRedux.dataWallets} changeIsReload={handleReload}/>
            </Box>
        </>
    )
}

export default MyWallets;