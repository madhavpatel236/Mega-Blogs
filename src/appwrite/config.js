import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteBucketID,
                slug, // slug work as a unique id
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: create post :: error", error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteBucketID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )

        } catch (error) {
            console.log(" Appwrite services :: updateDocument :: error", error);
        }
    }

    async deletegePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteBucketID,
                slug,
            )
            return true;
        } catch (error) {
            console.log("Appwrite services :: deletePost :: error ", error);
            return false;
        }
    }

    // here we only get the post which show the active status of the user not get the all post
    async getPost(queries = [Query.equal("status", "active")]) {  // here if not create the index (Database > Blog > Articles > index) in the Appwrite services then we will not use the queries.
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteBucketID,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    // file uplode services
    async uplodeFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file,
            )

        } catch (error) {
            console.log("Appwrite service :: uplodeFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketID,
                file,
            )
            return true;
            
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(FileId){
        try {
            this.bucket.getFilePreview(
                conf.appwriteBucketID,
                FileId,
            )
        } catch (error) {
            console.log("Appwrite service :: getFilePreview :: error", error);
            return false;
        }
    }



}




const service = new Service();
export default service;