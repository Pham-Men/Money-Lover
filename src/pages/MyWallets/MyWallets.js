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

import styles from './Wallets.module.scss';

function MyWallets() {
    const loadding = useSelector((state) => state.toggle.isOpenLoading);
    console.log(loadding, "day la ld");

    const walletsByRedux = useSelector(selectorWallets);

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
                    item.fields.uid.arrayValue.values.some(i=>(i.stringValue === JSON.parse(localStorage.getItem('userAuth')).uid))
                ))
                dispatch(setWalletsToRedux(wallets))
            })
            .catch(error => {
                console.log(error);
            });
    }, [isReload])

    return (
      <>
        {loadding ? (
          <div
            className={
              styles["loadding"] +
              " position-fixed top-0 bottom-0 left-0 right-0 d-flex justify-content-center align-items-center"
            }
          >
            <div className={styles["loadding-body"]}>
              <div
                className={styles["loadding-spinner"] + " spinner-border"}
                role="status"
              >
                <span className="sr-only"></span>
              </div>
              <p>Loadding...</p>
            </div>
          </div>
        ) : (
          <></>
        )}

        <Box
          sx={{
            backgroundColor: `${bgGray}`,
            minHeight: "100vh",
          }}
        >
          <BreadcrumbsComponent />
          <Box>
            <Button
              onClick={handleOpenCreateWallet}
              sx={{
                zIndex: "2",
                position: "absolute",
                right: "80px",
                top: "14px",
                backgroundColor: `${primary}`,
                color: "white",
                "&:hover": {
                  backgroundColor: `${hoverGreen}`,
                  color: "white",
                },
              }}
            >
              Add Wallet
            </Button>
            <Modal
              open={stateisOpen.isOpenCreateWallet}
              onClose={handleCloseCreateWallet}
            >
              <CreateMyWallets changeIsReload={handleReload} />
            </Modal>
          </Box>
          <Box>
            <Button
              onClick={handleOpenTransferMoney}
              sx={{
                zIndex: "2",
                position: "absolute",
                right: "280px",
                top: "14px",
                backgroundColor: `${primary}`,
                color: "white",
                "&:hover": {
                  backgroundColor: `${hoverGreen}`,
                  color: "white",
                },
              }}
            >
              transfer money
            </Button>
            <Modal
              open={stateisOpen.isOpenTransferMoney}
              onClose={handleCloseTransferMoney}
            >
              <TransferMoney changeIsReload={handleReload} />
            </Modal>
          </Box>
          <Wallet
            wallets={walletsByRedux.dataWallets}
            changeIsReload={handleReload}
          />
        </Box>
      </>
    );
}

export default MyWallets;