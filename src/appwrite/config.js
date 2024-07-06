import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('66755a04001dad428abd');

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteBucketId,
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

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteBucketId,
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
                conf.appwriteBucketId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error.message);
            return false;
        }
    }

    // file uplode services
    async uplodeFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
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
                conf.appwriteBucketId,
                file,
            )
            return true;
            
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(featuredImage){
        try {
            this.bucket.getFilePreview(
                conf.appwriteBucketId,
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