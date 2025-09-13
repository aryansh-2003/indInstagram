import conf from '../conf/Conf.js'
import { Client, Account, ID, Databases, Query, Storage } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket

    constructor() {
      this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
      this.account = new Account(this.client);
      this.databases = new Databases(this.client)
      this.bucket = new Storage(this.client);
    }


    async createUserDocument(userId,{username,bgImage,avatar}){
        console.log(userId,username)
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUserCollectionId,
                userId,
                {
                    username:username
                }
            )
        } catch (error) {
            console.log("Auth service :: creating Document failed", error); 
        }
    }

    async updatePost(slug,{avatar}){
        console.log(slug,avatar)
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUserCollectionId,
                slug,
                {
                    avatar
                }
            )
        } catch (error) {
            console.log("Auth service :: Updating post failed", error);
        }

    }

    async updateLike(slug,{like}){
        console.log(like,slug)
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    likes:like,

                }
            )
        } catch (error) {
            console.log("Auth service :: Updating post failed", error);
        }

    }

    async getUserAccnt(userId){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteUserCollectionId,
                [Query.equal("$id", `${userId}`)],

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

       async uploadFile(file){
        console.log(file)
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Auth service :: Uploading File failed", error);
            return false
        }
    }

    async deletePost(slug){
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Auth service :: Deleting post failed", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUserCollectionId,
                slug
            )
        } catch (error) {
            console.log("Auth service :: getting post failed", error);
            
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("status","active")
                ]
            )
        } catch (error) {
            console.log("Auth service :: getPosts post failed", error);
        }
    }

    // file upload servives

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Auth service :: Uploading File failed", error);
            return false
        }
    }

    
    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Auth service :: Deleting File failed", error);
            return false
        }
    }

       getFilePreiview(fileId){
        if(fileId == null || undefined){
            return null
        }else{
                return this.bucket.getFileView(
                conf.appwriteBucketId,
                fileId
                )
        }
       
    }


}


const service = new Service()

export default service
