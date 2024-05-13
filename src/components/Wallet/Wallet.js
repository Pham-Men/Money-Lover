import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import CardMedia from '@mui/material/CardMedia';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';

import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';

import { primary, textGrey } from '../../const/constCSS';
import ModalUpdateWallet from '../ModalUpdateWallet/ModalUpdateWallet';
import { toggleShareWallet, toggleUpdateWallet } from '../../redux/slices/toggleSlice';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectorAuth, selectorToggle, selectorWallets } from '../../selector';
import WalletService from '../../services/wallet.service';
import { IconButton, Tooltip } from '@mui/material';
import { getWalletId } from '../../const/const';
import ModalSharedWallet from '../ModalSharedWallet/ModalSharedWallet';

import { toggleLoading } from '../../redux/slices/toggleSlice';

import './Wallet.css';

function Wallet({ changeIsReload }) {

    const wallets = useSelector(selectorWallets).dataWallets;

    const stateisOpen = useSelector(selectorToggle);
    const userAuth = useSelector(selectorAuth);

    const dispatch = useDispatch();

    const [display, setDisplay] = useState(false);
    const [indDetail, setIndDetail] = useState();
    const [walletSharedId, setWalletSharedId] = useState();

    const getListWalletIdShare = () => {
        const listWalletShare = wallets.filter(wallet => (
            wallet.fields.uid.arrayValue.values.some(item => (item.stringValue !== userAuth.uid))
        ))
        return listWalletShare.map(walletShare => (getWalletId(walletShare)))
    }

    const changeDisplayDetailWallet = () => {
        setDisplay(!display)
    }

    const handleDetail = (ind) => {
        setIndDetail(ind)
        setDisplay(true)
    }

    const handleDelete = (ind) => {
        const isConfirmed = window.confirm('Are you sure you want to delete?');
        dispatch(toggleLoading());
        if (isConfirmed) {
            const idWallet = getWalletId(wallets[ind]);
            WalletService.deleteWallets(idWallet)
                .then(() => {
                    changeIsReload();
                })
                .catch((err) => console.log(err))
            // .finally(() => {
            //     dispatch(toggleLoading());
            // });
        }
    }

    const handleOpen = () => dispatch(toggleUpdateWallet());
    const handleClose = () => dispatch(toggleUpdateWallet());

    const handleOpenShareWallet = (ind) => {
        setWalletSharedId(ind)
        dispatch(toggleShareWallet())
    }
    const handleCloseShareWallet = () => dispatch(toggleShareWallet())

    const handleDeleteWalletShared = (ind) => {
        const isConfirmed = window.confirm('Are you sure you want to delete the wallet sharing account?');
        if (isConfirmed) {
            WalletService.updateWallet(
                getWalletId(wallets[ind]),
                {
                    fields: {
                        name: { 'stringValue': wallets[ind].fields.name.stringValue },
                        totalMoney: { 'integerValue': wallets[ind].fields.totalMoney.integerValue },
                        currency: { 'stringValue': wallets[ind].fields.currency.stringValue },
                        img: { 'stringValue': wallets[ind].fields.img.stringValue },
                        uid: {
                            'arrayValue': {
                                'values': [
                                    { 'stringValue': JSON.parse(localStorage.getItem('userAuth')).uid },
                                ]
                            }
                        }
                    }
                }
            )
                .then(() => {
                    changeIsReload()
                    toggleLoading()
                })
                .catch()
        }
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    margin: '32px auto',
                }}
            >
                <Box
                    sx={{
                        width: '576px',
                        height: '100%',
                        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        marginTop: '62px'
                    }}
                >
                    <Box
                        sx={{
                            borderBottom: `1px solid ${textGrey}`,
                            padding: '20px',
                            backgroundColor: 'rgb(244, 244, 244)',
                            borderTopLeftRadius: '8px',
                            borderTopRightRadius: '8px'
                        }}
                    >
                        <Typography
                            sx={{
                                fontFamily: 'roboto, sans-serif',
                                fontSize: '12px',
                                fontWeight: '400',
                                color: `${textGrey}`,
                                style: 'normal',

                            }}
                        >
                            Excluded from Total
                        </Typography>
                    </Box>
                    {wallets.length > 0 && wallets.map((item, ind) => (
                        <Box
                            sx={{
                                padding: '20px 0',
                                display: 'flex',
                                paddingLeft: '20px',
                                justifyContent: 'space-between',
                                '&:hover': {
                                    backgroundColor: 'rgb(229, 239, 231)',
                                    borderBottomRightRadius: '8px',
                                    borderBottomLeftRadius: '8px',
                                }
                            }}
                        >
                            <Box
                                onClick={() => handleDetail(ind)}
                                sx={{
                                    cursor: 'pointer',
                                    display: 'flex'
                                }}
                            >
                                <CardMedia
                                    component='img'
                                    sx={{
                                        height: '38px',
                                        width: '38px',
                                        marginRight: '20px'
                                    }}
                                    image={item.fields.img.stringValue}
                                />

                                <Box>
                                    <Typography
                                        sx={{
                                            fontFamily: 'roboto, sans-serif',
                                            fontSize: '12px',
                                            fontWeight: '400',
                                            color: `${textGrey}`,
                                            style: 'normal',
                                        }}
                                    >
                                        {item.fields.totalMoney.integerValue}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontFamily: 'roboto, sans-serif',
                                            fontSize: '14px',
                                            fontWeight: '500',
                                            style: 'normal',
                                        }}
                                    >
                                        {item.fields.currency.stringValue}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box>
                                {wallets.length > 0 && getListWalletIdShare().length > 0 && getListWalletIdShare().some(walletIdShare => (walletIdShare) === getWalletId(item)) ? (
                                    <Tooltip
                                        title='Delete Shared wallet'
                                        placement='top'
                                    >
                                        <IconButton
                                            sx={{
                                                marginRight: '40px',
                                            }}
                                            onClick={() => handleDeleteWalletShared(ind)}
                                        >
                                            <ShareIcon
                                                color='warning'
                                            />
                                        </IconButton>
                                    </Tooltip>
                                ) : (
                                    <></>
                                )}
                                {wallets.length > 0 && getListWalletIdShare().length >0 && getListWalletIdShare().some(walletIdShare => (walletIdShare) === getWalletId(item)) ? (
                                    <Tooltip
                                        title='No Share Wallet'
                                        placement='top'
                                    >
                                        <IconButton
                                            sx={{
                                                marginRight: '40px'
                                            }}
                                        >
                                            <ShareIcon
                                                className='disabledIconShare'
                                            />
                                        </IconButton>
                                    </Tooltip>
                                ) : (
                                    <Tooltip
                                        title='Share Wallet'
                                        placement='top'
                                    >
                                        <IconButton
                                            onClick={() => handleOpenShareWallet(ind)}
                                            sx={{
                                                marginRight: '40px'
                                            }}
                                        >
                                            <ShareIcon
                                                className='iconShare'
                                            />
                                        </IconButton>
                                    </Tooltip>
                                )
                                }
                                <Modal
                                    open={stateisOpen.isOpenShareWallet}
                                    onClose={handleCloseShareWallet}
                                >
                                    <ModalSharedWallet
                                        changeIsReload={changeIsReload}
                                        walletShared={wallets[walletSharedId]}
                                    />
                                </Modal>
                                <Tooltip
                                    title='Delete'
                                    placement='top'
                                >
                                    <DeleteIcon
                                        onClick={() => handleDelete(ind)}
                                        color='success'
                                        sx={{
                                            marginRight: '20px',
                                            cursor: 'pointer'
                                        }}
                                    />
                                </Tooltip>
                            </Box>
                        </Box>
                    ))
                    }
                    {!wallets.length &&
                        <Typography
                            sx={{
                                padding: '20px 0',
                                paddingLeft: '20px',
                                fontSize: '16px',
                                '&:hover': {
                                    backgroundColor: 'rgb(229, 239, 231)',
                                    borderBottomRightRadius: '8px',
                                    borderBottomLeftRadius: '8px',
                                }
                            }}
                        >
                            No wallet
                        </Typography>
                    }
                </Box>
                {display &&
                    <Box
                        sx={{
                            width: '800px',
                            height: '520px',
                            backgroundColor: 'white',
                            borderRadius: '8px',

                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignContent: 'center',
                                paddingTop: '22px',
                                paddingLeft: '40px',
                                paddingBottom: '22px',
                                borderBottom: `1px solid ${textGrey}`
                            }}
                        >
                            <Box
                                sx={{
                                    paddingRight: '32px'
                                }}
                            >
                                <CloseIcon
                                    sx={{
                                        cursor: 'pointer',
                                        color: `${textGrey}`
                                    }}
                                    onClick={() => setDisplay(false)}
                                />
                            </Box>
                            <Typography
                                sx={{
                                    fontFamily: 'Roboto, sans-serif',
                                    fontSize: '20px',
                                    fontWeight: '500',
                                    style: 'normal',
                                }}
                            >
                                Wallet details
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                padding: '20px 0',
                                display: 'flex',
                                paddingLeft: '68px',
                                borderBottom: `1px solid ${textGrey}`,
                                '&:hover': {
                                    backgroundColor: 'rgb(229, 239, 231)',
                                    borderBottomRightRadius: '8px',
                                    borderBottomLeftRadius: '8px',
                                }
                            }}
                        >
                            <CardMedia
                                component='img'
                                sx={{
                                    height: '50px',
                                    width: '50px',
                                    marginRight: '36px'
                                }}
                                image={wallets[indDetail].fields.img.stringValue}
                            />
                            {wallets.length > 0 &&
                                <Box>
                                    <Typography
                                        sx={{
                                            fontFamily: 'roboto, sans-serif',
                                            fontSize: '14px',
                                            fontWeight: '400',
                                            color: `${textGrey}`,
                                            style: 'normal',
                                        }}
                                    >
                                        {wallets[indDetail].fields.totalMoney.integerValue}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontFamily: 'roboto, sans-serif',
                                            fontSize: '24px',
                                            fontWeight: '400',
                                            style: 'normal',
                                        }}
                                    >
                                        {wallets[indDetail].fields.currency.stringValue}
                                    </Typography>
                                </Box>
                            }
                        </Box>

                        <Box
                            sx={{
                                paddingLeft: '68px',
                                borderBottom: `1px solid ${textGrey}`,
                                paddingBottom: '20px'
                            }}
                        >
                            <Typography
                                sx={{
                                    fontFamily: 'roboto, sans-serif',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    style: 'normal',
                                    paddingRight: '20px',
                                    color: `${textGrey}`,
                                    paddingTop: '20px',
                                    paddingBottom: '28px'
                                }}
                            >
                                User
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignContent: 'center',

                                }}
                            >
                                <Avatar
                                    sx={{
                                        backgroundColor: `${primary}`
                                    }}
                                >
                                    {wallets[indDetail].fields.name.stringValue[0].toUpperCase()}
                                </Avatar>
                                <Typography
                                    sx={{
                                        fontFamily: 'roboto, sans-serif',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        style: 'normal',
                                        paddingLeft: '20px'
                                    }}
                                >
                                    {userAuth.email}
                                </Typography>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                paddingLeft: '68px',
                                borderBottom: `1px solid ${textGrey}`
                            }}
                        >
                            <Box
                                sx={{
                                    paddingTop: '20px',
                                    paddingBottom: '28px',
                                    display: 'flex'
                                }}
                            >
                                <Box>
                                    <Checkbox
                                        sx={{
                                            color: `${primary}`,
                                        }}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        paddingLeft: '20px'
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: 'roboto, sans-serif',
                                            fontSize: '14px',
                                            fontWeight: '400',
                                            color: `${textGrey}`,
                                            style: 'normal',
                                        }}
                                    >
                                        Excluded from Total
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontFamily: 'roboto, sans-serif',
                                            fontSize: '12px',
                                            fontWeight: '400',
                                            color: `${textGrey}`,
                                            style: 'normal',
                                        }}
                                    >
                                        Ignore this wallet and its balance in the "Total" mode.
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Box
                            sx={{
                                paddingLeft: '68px',
                                borderBottom: `1px solid ${textGrey}`
                            }}
                        >
                            <Box
                                sx={{
                                    paddingTop: '20px',
                                    paddingBottom: '28px',
                                    display: 'flex'
                                }}
                            >
                                <Box>
                                    <Checkbox
                                        sx={{
                                            color: `${primary}`
                                        }}
                                    />
                                </Box>
                                <Box
                                    sx={{
                                        paddingLeft: '20px'
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontFamily: 'roboto, sans-serif',
                                            fontSize: '14px',
                                            fontWeight: '400',
                                            color: `${textGrey}`,
                                            style: 'normal',
                                        }}
                                    >
                                        Archived
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontFamily: 'roboto, sans-serif',
                                            fontSize: '12px',
                                            fontWeight: '400',
                                            color: `${textGrey}`,
                                            style: 'normal',
                                        }}
                                    >
                                        Freeze this wallet and stop generating bills & recurring transactions.
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>

                        <Button
                            onClick={handleOpen}
                            sx={{
                                color: `${primary}`,
                                width: '100%',
                                fontFamily: 'roboto, sans-serif',
                                fontSize: '14px',
                                fontWeight: '500',
                                style: 'normal',
                                '&:hover': {
                                    backgroundColor: 'rgb(229, 239, 231)',
                                    borderBottomRightRadius: '8px',
                                    borderBottomLeftRadius: '8px',
                                }
                            }}
                        >
                            wallet update
                        </Button>
                        <Modal
                            open={stateisOpen.isOpenUpdateWallet}
                            onClose={handleClose}
                        >
                            <ModalUpdateWallet
                                dataUser={wallets[indDetail]}
                                changeIsReload={changeIsReload}
                                changeDisplayDetailWallet={changeDisplayDetailWallet}
                            />
                        </Modal>

                    </Box>
                }
            </Box >
        </>

    )
}

export default Wallet;