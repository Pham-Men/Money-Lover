import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'
import CardMedia from '@mui/material/CardMedia';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';

import CloseIcon from '@mui/icons-material/Close';

import { primary, textGrey } from '../../const/constCSS';
import ModalUpdateWallet from '../ModalUpdateWallet/ModalUpdateWallet';
import {toggleUpdateWallet} from '../../redux/slices/toggleSlice'

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectorAuth } from '../../selector';
import { selectorToggle } from '../../selector';

function Wallet(prop) {

    const userAuth = useSelector(selectorAuth);
    console.log(userAuth);

    const stateisOpen = useSelector(selectorToggle)
    console.log(stateisOpen.isOpenUpdateWallet);

    const dispatch = useDispatch();

    const [display, setDisplay] = useState(false)

    const handleDetail = () => {
        setDisplay(true)
    }

    const handleOpen = () => dispatch(toggleUpdateWallet());
    const handleClose = () => dispatch(toggleUpdateWallet());

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
                        height: '138px',
                        boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
                        backgroundColor: 'white',
                        borderRadius: '8px'
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
                    <Box
                        onClick={handleDetail}
                        sx={{
                            padding: '20px 0',
                            display: 'flex',
                            cursor: 'pointer',
                            paddingLeft: '20px',
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
                                height: '38px',
                                width: '38px',
                                marginRight: '20px'
                            }}
                            image='img/iconWallet.png'
                        />
                        {prop &&
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
                                    {prop.dataUser.totalMoney.integerValue}
                                </Typography>
                                <Typography
                                    sx={{
                                        fontFamily: 'roboto, sans-serif',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        style: 'normal',
                                    }}
                                >
                                    {prop.dataUser.currency.stringValue}
                                </Typography>
                            </Box>
                        }
                    </Box>
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
                                image='img/iconWallet.png'
                            />
                            {prop && 
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
                                        {prop.dataUser.totalMoney.integerValue}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontFamily: 'roboto, sans-serif',
                                            fontSize: '24px',
                                            fontWeight: '400',
                                            style: 'normal',
                                        }}
                                    >
                                        {prop.dataUser.currency.stringValue}
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
                            {userAuth.email && 
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
                                        {userAuth.email[0].toUpperCase()}
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
                            }
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
                            ADJUST BALANCE
                        </Button>
                        <Modal
                            open={stateisOpen.isOpenUpdateWallet}
                            onClose={handleClose}
                        >
                            <ModalUpdateWallet datauser={prop.dataUser}/>
                        </Modal>

                    </Box>
                }
            </Box>
        </>
    )
}

export default Wallet;