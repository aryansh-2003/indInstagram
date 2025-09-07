import conf from '../conf/Conf.js'
import { Client, Account, ID } from "appwrite";

export class Authservice {
    client = new Client()
    account;

    constructor() {
      this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
      this.account = new Account(this.client);
    }

    async createNewAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if(userAccount) this.login({email,password})
            console.log(userAccount)
        } catch (error) {
            console.log("Auth service :: creating account failed", error);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async login({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            console.log("Auth service :: login failed", error);
        }
    }

    async logout(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Auth service :: logout failed", error);
        }
    }

    async getUserInfo({userId}){
        try {
           return await this.account.get(userId)
        } catch (error) {
            console.log("Auth service :: getting user failed", error);
        }
    }

    // async getUserByPostId(){
    //     try {
    //         return await this.account.get(userId)
    //     } catch (error) {
            
    //     }
    // }
}


const authservice = new Authservice()

export default authservice
