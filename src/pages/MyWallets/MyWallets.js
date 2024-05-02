import Box from "@mui/material/Box";
import Button from '@mui/material/Button';

import { bgGray, hoverGreen, primary } from "../../const/constCSS";
import Wallet from '../../components/Wallet/Wallet';
import CreateMyWallets from '../../components/CreateMyWallets/CreateMyWallets';
import { firebaseConfig } from '../../config';

import { useEffect, } from 'react';

import axios from 'axios'

import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../../redux/slices/dataUserSlice';
import { selectorAuth, selectorToggle, selectordataUser } from '../../selector';

import { Modal } from '@mui/material';
import { toggleCreateWallet } from '../../redux/slices/toggleSlice';
import { firestoreUrl } from '../../const/const';
import BreadcrumbsComponent from '../../components/BreadcrubsComponent/BreadcrumbsComponent';

function MyWallets() {

    const userAuth = useSelector(selectorAuth);
    console.log(userAuth);

    const dataUser = useSelector(selectordataUser);
    console.log(dataUser.data);
    const stateisOpen = useSelector(selectorToggle);

    const dispatch = useDispatch();

    const handleOpen = () => {
        dispatch(toggleCreateWallet())
    }

    const handleClose = () => {
        dispatch(toggleCreateWallet())
    }

    useEffect(() => {
        axios.get(firestoreUrl)
            .then(response => {
                const Wallets = response.data.documents.filter(item => (
                    item.fields.uid.stringValue === JSON.parse(localStorage.getItem('userAuth')).uid)
                )
                // console.log(Wallets)
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
                        onClick={handleOpen}
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
                        onClose={handleClose}
                    >
                        <CreateMyWallets />
                    </Modal>
                </Box>
                <Wallet dataUser={dataUser} />
            </Box>
        </>
    )
}

export default MyWallets;