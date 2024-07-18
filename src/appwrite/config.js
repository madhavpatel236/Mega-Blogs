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

    async createPost({ title, file, slug, content, FeaturedImage, status, userID }) {
        try {
            return this.databases.createDocument(
                '66755acd001e4defbd1c',
                '66755b0900217b5b6c16',
                slug, // slug work as a unique id
                {
                    title,
                    content,
                    FeaturedImage,
                    status,
                    userID,
                    file
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: create post :: error", error);
        }
    }

    async updatePost(slug, { title, content, FeaturedImage, status }) {
        try {
            return this.databases.updateDocument(
                '66755acd001e4defbd1c',
                '66755b0900217b5b6c16',
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
                '66755acd001e4defbd1c',
                '66755b0900217b5b6c16',
                slug,
            )
            return true;
        } catch (error) {
            console.log("Appwrite services :: deletePost :: error ", error);
            return false;
        }
    }


    async getPost(slug){
        try {
            return await this.databases.getDocument(
                `66755acd001e4defbd1c`,
                `66755b0900217b5b6c16`,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    // here we only get the post which show the active status of the user not get the all post
    async getPosts(queries = [Query.equal("status", "active")]) {  // here if not create the index (Database > Blog > Articles > index) in the Appwrite services then we will not use the queries.
        try {
            return await this.databases.listDocuments(
                '66755acd001e4defbd1c',
                '66755b0900217b5b6c16',
                queries,
            )
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error.message);
            return false;
        }
    }

    // file uplode services
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                '66755c610031ad6accbd',
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: uplodeFile :: error", error);
            return false;
        }
    }

    async deleteFile(file) {
        try {
            await this.bucket.deleteFile(
                '66755c610031ad6accbd',
                file,
            )
            return true;

        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId) {

        try {
           return this.bucket.getFilePreview(
                '66755c610031ad6accbd',
                fileId,
            )
        } catch (error) {
            console.log("Appwrite service :: getFilePreview :: error", error);
            return false;
        }
    }



}

const service = new Service();
export default service;