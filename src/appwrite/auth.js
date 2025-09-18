import conf from '../conf/Conf.js'
import { Client, Account, ID, Query } from "appwrite";
import userService from './user.js'

export class Authservice {
    client = new Client()
    account;

    constructor() {
      this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
      this.account = new Account(this.client);
    }

// Updated createNewAccount method in your auth.js file
async createNewAccount({email, password, name}) {
    try {
        const newID = ID.unique()
        const userAccount = await this.account.create(newID, email, password, name); 
        
        if(userAccount) {
            // Automatically login the user after account creation
            const session = await this.login({email, password})
            
            if(session) {
                return userAccount; // Return the created account
            }
        }
        
        return null;
    } catch (error) {
        console.log("Auth service :: creating account failed", error);
        throw error; // Re-throw the error so the signup component can handle it
    }
}
    async getCurrentUser() {
        try {
            const Account = await this.account.get();
            console.log(Account)
            if (Account){
                const userDoc = await userService.getUserAccnt(Account.$id)
                console.log(userDoc)

                if(userDoc.documents.length == 0){
                     const userCreate = await userService.createUserDocument(Account.$id,{username:Account.name})
                     console.log(userCreate)
                     if(!userCreate) return "Something went wrong"
                     return Account
                }else{
                    return Account
                }
            }
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

    async getUserInfo(userId){
        try {
           return await this.account.get("68ac46650018177b2e3e",
            [Query.equal("userId", ``)]
           )
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
