import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db('<ชื่อฐานข้อมูล>');
        const collection = database.collection('<ชื่อคอลเล็กชัน>');
        const data = await collection.find({}).toArray();
        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error: 'Failed to connect to the database.' });
    } finally {
        await client.close();
    }
}
