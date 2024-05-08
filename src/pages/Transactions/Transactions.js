import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import BreadcrumbsComponent from '../../components/BreadcrubsComponent/BreadcrumbsComponent';
import { bgGray, hoverGreen, primary } from "../../const/constCSS";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { selectorToggle } from '../../selector';
import WalletService from '../../services/wallet.service';
import { useNavigate } from 'react-router-dom';
import { toggleRevenue, toggleSpending } from '../../redux/slices/toggleSlice';
import ExtraSpending from '../../components/ExtraSpending/ExtraSpending';
import ModalAddRevenue from '../../components/AddRevenue/AddRevenue';
import ModalExtraSpending from '../../components/ExtraSpending/ExtraSpending';


function Transactions() {

    const stateToggle = useSelector(selectorToggle);
    // console.log(walletsByRedux.dataWallets)

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
                        <ModalExtraSpending />
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
                        <ModalAddRevenue />
                    </Modal>
                </Box>
            </Box>
        </>
    )
}

export default Transactions;