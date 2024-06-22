const conf = {
    appwriteUrl: String(import.meta.env.VITE_APIWRITE_URL ),
    appwriteProjectId: String(import.meta.env.VITE_APIWRITE_PROJECT_ID ),
    appwriteDatabaseId: String(import.meta.env.VITE_APIWRITE_DATABASE_ID ),
    appwriteCollectionId: String(import.meta.env.VITE_APIWRITE_COLLECTION_ID ),
    appwriteBucketID: String(import.meta.env.VITE_APIWRITE_BUCKET_ID )
}

export default conf

