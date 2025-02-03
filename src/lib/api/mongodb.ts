import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

declare global {
    var _mongoClientPromise: Promise<MongoClient>;
}

dotenv.config({ path: '.env.local' });

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (!uri) {
    throw new Error('Please add your Mongo URI to .env.local');
}

if (typeof window === 'undefined') {
    // Ensure this code is only executed on the server side
    if (process.env.NODE_ENV === 'development') {
        if (!global._mongoClientPromise) {
            client = new MongoClient(uri, options);
            global._mongoClientPromise = client.connect();
        }
        clientPromise = global._mongoClientPromise;
    } else {
        client = new MongoClient(uri, options);
        clientPromise = client.connect();
    }
} else {
    // Handle the case where this code is executed on the client side
    clientPromise = Promise.reject(new Error('MongoDB client cannot be initialized on the client side'));
}

export default clientPromise;