import axios from "axios";
import { firestoreUrl } from "../const/const";

class WalletService {

    static async getWallets () {
        return await axios.get(firestoreUrl)
    }
    static async getWallet (id) {
        return await axios.get(`${firestoreUrl}/${id}`)
    }
    static async deleteWallets (id) {
        return await axios.delete(`${firestoreUrl}/${id}`)
    }
    static async updateWallet (id, data) {
        return await axios.patch(`${firestoreUrl}/${id}`, data)
    }
}

export default WalletService;