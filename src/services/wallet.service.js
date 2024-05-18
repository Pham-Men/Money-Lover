import axios from "axios";
import { firestoreUrlTranSacTions, firestoreUrlWallets } from "../const/const";

class WalletService {

    static async getWallets () {
        return await axios.get(firestoreUrlWallets)
    }

    static async addWallet (data) {
        return await axios.post(firestoreUrlWallets, data)
    }

    static async getWallet (id) {
        return await axios.get(`${firestoreUrlWallets}/${id}`)
    }

    static async deleteWallets (id) {
        return await axios.delete(`${firestoreUrlWallets}/${id}`)
    }

    static async updateWallet (id, data) {
        return await axios.patch(`${firestoreUrlWallets}/${id}`, data)
    }

    static async getTransactions () {
        return await axios.get(`${firestoreUrlTranSacTions}`)
    }

    static async addTransaction (data) {
        return await axios.post(firestoreUrlTranSacTions, data)
    }

    static async deleteSpending (id) {
        return await axios.delete(`${firestoreUrlTranSacTions}/${id}`)
    }

    static async updateSpending (id, data) {
        return await axios.patch(`${firestoreUrlTranSacTions}/${id}`, data)
    }
}

export default WalletService;