import Breadcrumbs from '@mui/material/Breadcrumbs';
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { bgGray, hoverGreen, primary } from "../../const/constCSS";
import Wallet from '../../components/Wallet/Wallet';
import CreateMyWallets from '../../components/CreateMyWallets/CreateMyWallets';
import { firebaseConfig } from '../../config';

import { useEffect,} from 'react';

import axios from 'axios'

import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../../redux/slices/dataUserSlice';
import { selectorAuth, selectorToggle, selectordataUser } from '../../selector';

import { useNavigate } from 'react-router-dom';
import { Modal } from '@mui/material';
import { toggleCreateWallet } from '../../redux/slices/toggleSlice';
import { collectionName } from '../../const/const';

function MyWallets() {

    const userAuth = useSelector(selectorAuth);
    console.log(userAuth);

    const dataUser = useSelector(selectordataUser);
    // console.log(dataUser.data);
    const stateisOpen = useSelector(selectorToggle);

    const dispatch = useDispatch();

    const handleOpen = () => {
        dispatch(toggleCreateWallet())
    }

    const handleClose = () => {
        dispatch(toggleCreateWallet())
    }

    const firestoreUrl =
        `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/${collectionName}`;

    useEffect(() => {
        axios.get(firestoreUrl)
            .then(response => {
                const Wallets = response.data.documents.filter(item => (
                    item.fields.uid.stringValue == JSON.parse(localStorage.getItem('userAuth')).uid)
                )
                console.log(Wallets)
                dispatch(setUserData(Wallets))
            })
            .catch(error => {
                console.error("Error fetching data from Firestore:", error);
            });
    }, [])

    const navigate = useNavigate();

    const toHome = () => {
        navigate('/')
    }
    return (
        <>
            <Box
                sx={{
                    backgroundColor: `${bgGray}`,
                    height: '100vh',
                }}
            >
                <Breadcrumbs
                    sx={{
                        height: '62px',
                        backgroundColor: 'white',
                    }}
                >
                    <Box
                        onClick={toHome}
                        sx={{
                            height: '62px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Box>
                            <ArrowBackIcon
                                sx={{
                                    marginLeft: '80px',
                                    marginRight: '36px'
                                }}
                            />
                        </Box>
                        <Typography
                            sx={{
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: '20px',
                                fontWeight: '500',
                                color: 'black',
                                style: 'normal'
                            }}
                        >
                            My Wallets
                        </Typography>
                    </Box>
                    <Button
                        onClick={handleOpen}
                        sx={{
                            marginLeft: '800px',
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
                </Breadcrumbs>
                <Wallet dataUser={dataUser}/>
            </Box>
        </>
    )
}

export default MyWallets;