import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/api/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db('halalrest');
    const collection = db.collection('restaurants');

    if (req.method === 'POST') {
        try {
            const newRestaurant = req.body;
            await collection.insertOne(newRestaurant);
            res.status(201).json({ message: 'Restaurant added successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Failed to add restaurant' });
        }
    } else if (req.method === 'GET') {
        try {
            const data = await collection.find({}).toArray();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch data' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}