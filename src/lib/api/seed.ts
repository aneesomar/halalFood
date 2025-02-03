import clientPromise from './mongodb';
import restaurants from '@/data/rest.json';

async function seedDatabase() {
    const client = await clientPromise;
    const db = client.db('halalrest');
    const collection = db.collection('restaurants');

    await collection.deleteMany({});
    await collection.insertMany(restaurants);

    console.log('Database seeded successfully');
    process.exit(0);
}

seedDatabase().catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
});

