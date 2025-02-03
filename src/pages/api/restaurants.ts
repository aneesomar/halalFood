import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/api/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const client = await clientPromise;
        const db = client.db('halalrest');
        const collection = db.collection('restaurants');
        const data = await collection.find({}).toArray();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}