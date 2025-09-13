import { Client, Account, ID, Databases, Query, Storage } from "appwrite";
import conf from "../conf/Conf";


export class interService{
    client = new Client();
    databases;
    bucket

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.account = new Account(this.client)
        this.datbases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createDocument(ownerId,{postId}){
        try {
            const likes = await this.getLikes(ownerId,{postId})

            if(likes.total !== 0 || likes.documents.length !== 0){
                const likeWantToDelete = likes.documents[0].$id
                if(likeWantToDelete)  await this.deleteLikes(likeWantToDelete)
                return false
            }else{
                     await this.datbases.createDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteLikeCollectionId,
                    ID.unique(),
                    {
                        postId,
                        ownerId
    
                    }
               )
               return true
            }
            
            
        } catch (error) {
            console.log(error)
        }
    }
    
    async getLikes(ownerId,{postId}){
        try {
             return await this.datbases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteLikeCollectionId,
             [
                Query.equal("postId",`${postId}`),
                Query.equal("ownerId",`${ownerId}`)
             ]
            
            )
            return true
        } catch (error) {
            console.log(error,"false")
            return false
        }
    }

    async getTotalLikes({postId}){
        try {
             return await this.datbases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteLikeCollectionId,
             [
                Query.equal("postId",`${postId}`)
             ]
            
            )
            return true
        } catch (error) {
            console.log(error,"false")
            return false
        }
    }

    async deleteLikes(documentId){
        try {
            return await this.datbases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteLikeCollectionId,
                documentId
            )
        } catch (error) {
            console.log(error)
        }
    }



    async createComment(ownerId,{postId,comment}){
        try {
                return await this.datbases.createDocument(
                 conf.appwriteDatabaseId,
                 conf.appwriteCommentCollectionId,
                 ID.unique(),
                {
                    postId,
                    ownerId,
                    comment
                }
               )
            }
            
        catch (error) {
            console.log(error)
        }
    }

    // async getComment(ownerId,{postId}){
    //     try {
    //          return await this.datbases.listDocuments(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteLikeCollectionId,
    //          [
    //             Query.equal("postId",`${postId}`),
    //             Query.equal("ownerId",`${ownerId}`)
    //          ]
            
    //         )
    //         return true
    //     } catch (error) {
    //         console.log(error,"false")
    //         return false
    //     }
    // }

    async getTotalComments({postId}){
        try {
             return await this.datbases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCommentCollectionId,
             [
                Query.equal("postId",`${postId}`)
             ]
            
            )
        } catch (error) {
            console.log(error,"false")
            return false
        }
    }

    // async deleteComment(documentId){
    //     try {
    //         return await this.datbases.deleteDocument(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteLikeCollectionId,
    //             documentId
    //         )
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
}


const interservice = new interService()

export default interservice