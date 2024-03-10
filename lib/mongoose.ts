"use server"

import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URL) return console.log('MONGODB_URL NOTFOUND');

    if(isConnected) return console.log('Already connected to MongoDB');

    try {
        
        await mongoose.connect(process.env.MONGODB_URL);

        isConnected = true;

        console.log('Connected to db');
        
    } catch (error) {
        console.log('UESR_ACTION', error);
        
    }
    
    
}