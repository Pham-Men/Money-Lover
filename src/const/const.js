import { useDispatch } from "react-redux";
import WalletService from "../services/wallet.service";

const collectionWallets = 'my-wallets';
const collectionTranSacTions = 'transactions';

export const API_URL = 'https://firestore.googleapis.com/v1';

export const projectId = 'money-lover-8ed64';

export const firestoreUrlWallets =
`${API_URL}/projects/${projectId}/databases/(default)/documents/${collectionWallets}`;

export const firestoreUrlTranSacTions =
`${API_URL}/projects/${projectId}/databases/(default)/documents/${collectionTranSacTions}`;

export const getWalletId = (wallet) => {
    return wallet.name.split('/')[wallet.name.split('/').length - 1]
}

export const getTransactionId = (transaction) => {
    return transaction.name.split('/')[transaction.name.split('/').length - 1]
}