import { Box, Button, TextField, Typography } from "@mui/material";
import { hoverGreen, primary } from "../../const/constCSS";

import * as Yup from 'yup';
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { toggleShareWallet } from "../../redux/slices/toggleSlice";
import WalletService from "../../services/wallet.service";
import { selectorWallets } from "../../selector";
import { getWalletId } from "../../const/const";
import { setWalletsToRedux } from "../../redux/slices/walletsSlice";
import { useEffect, useState } from "react";

function ModalSharedWallet({ ind, changeIsReload }) {

    const [arrUid, setArrUid] = useState();

    useEffect(() => {
        WalletService.getWallets()
            .then(res => {
                console.log(res)
                const listWallet = res.data.documents
                const result = listWallet.map(wallet => (
                    wallet.fields.uid.arrayValue.values.map(item => item.stringValue))
                )
                const arrayUidRepeat = result.reduce((acc, arr) => acc.concat(arr), []);
                setArrUid(Array.from(new Set(arrayUidRepeat)))
            })
            .catch()
    })

    const wallets = useSelector(selectorWallets);
    const idWalletShare = getWalletId(wallets.dataWallets[ind])

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            uid: ''
        },
        validationSchema: Yup.object({
            uid: Yup
                .string()
                .required('Required'),
        }),
        onSubmit: (values) => {
            if(arrUid.filter(uid => (uid === values.uid)).length > 0) {
                WalletService.updateWallet(
                    idWalletShare,
                    {
                        fields: {
                            name: { 'stringValue': wallets.dataWallets[ind].fields.name.stringValue },
                            totalMoney: { 'integerValue': wallets.dataWallets[ind].fields.totalMoney.integerValue },
                            currency: { 'stringValue': wallets.dataWallets[ind].fields.currency.stringValue },
                            img: { 'stringValue': wallets.dataWallets[ind].fields.img.stringValue },
                            uid: {
                                'arrayValue': {
                                    'values': [
                                        { 'stringValue': JSON.parse(localStorage.getItem('userAuth')).uid },
                                        { 'stringValue': values.uid }
                                    ]
                                }
                            }
                        }
                    }
                )
                    .then(() => {
                        WalletService.getWallets()
                            .then(response => {
                                const wallets = response.data.documents.filter(item => (
                                    item.fields.uid.arrayValue.values.stringValue === JSON.parse(localStorage.getItem('userAuth')).uid)
                                )
                                dispatch(setWalletsToRedux(wallets))
                            })
                            .catch(error => {
                                console.error(error);
                            });
                        dispatch(toggleShareWallet());
                        changeIsReload();
                    })
                    .catch(err => console.log(err))
            } else {
                alert('Account ID does not exist')
            }
        }
    })

    const handleClose = () => {
        dispatch(toggleShareWallet())
    }

    return (
        <>
            <Box
                sx={{
                    width: '496px',
                    height: '260px',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    padding: '50px'
                }}
            >
                <form onSubmit={formik.handleSubmit}>
                    <Typography
                        sx={{
                            fontSize: '20px',
                            color: `${primary}`,
                            fontWeight: '500',
                            marginBottom: '30px'
                        }}
                    >
                        Shared account:
                    </Typography>
                    <TextField
                        name='uid'
                        value={formik.values.uid}
                        onChange={formik.handleChange}
                        error={formik.touched.uid && Boolean(formik.errors.uid)}
                        helperText={formik.touched.uid && formik.errors.uid}
                        placeholder='Enter the ID of the receiving account'
                        color='success'
                        fullWidth
                        size='small'
                        sx={{
                            marginBottom: '30px'
                        }}
                    />
                    <Box
                        display='flex'
                        justifyContent='end'

                    >
                        <Button
                            onClick={handleClose}
                            sx={{
                                color: `${primary}`,
                                backgroundColor: 'rgb(230, 230, 230)',
                                marginRight: '30px',
                                '&:hover': {
                                    backgroundColor: 'rgb(216, 233, 220)',
                                    color: `${primary}`
                                }
                            }}
                        >
                            cancel
                        </Button>
                        <Button
                            disabled={!formik.isValid}
                            sx={{
                                backgroundColor: `${primary}`,
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: `${hoverGreen}`,
                                    color: 'white'
                                }
                            }}
                            type='submit'
                        >
                            done
                        </Button>
                    </Box>
                </form>
            </Box>
        </>
    );
}

export default ModalSharedWallet;