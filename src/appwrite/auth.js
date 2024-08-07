import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject('66755a04001dad428abd');

        this.account = new Account(this.client);
    }

    // create account
    async createAccount({ email, password, name }) {
        console.log(conf.appwriteProjectId.toString())
        console.log(conf.appwriteUrl)
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another funtion to get the account details
                return this.login({ email, password });
                // here we return the another function because we want that if the user creste the acoount then directly login in the site do not enter the id password to login the account.
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    // create login component
    // async login({ email, password }) {
    //     try {
    //         return await this.account.createEmailPasswordSession(email, password);
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log(" ")
        }
    }

    // get current user details for find the Active status of the user
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error.message);
        }
        return null;
    }
    
    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("AppWrite Service :: logout :: error", error)
        }
    }
}



const authservice = new AuthService();

export default authservice;
