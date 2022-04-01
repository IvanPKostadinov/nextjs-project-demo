import { MongoClient } from 'mongodb';

// domain.com/api/new-meetup

const USER_NAME = 'ivanpkostadinov';
const USER_PASSWORD = 'GCRJ2agW5xYdpPeh';
const DATABASE_NAME = 'meetups';

async function handler(req, res) {
  if (req.method === 'POST') {
    // triggered in: POST to domain.com/api/new-meetup
    const data = req.data;

    // const { title, image, address, description } = data;

    // Connection string from cloud.mongodb.com -> the Cluster we want to connect to:
    // This will give us a connected client:
    const client = await MongoClient.connect(
      `mongodb+srv://${USER_NAME}:${USER_PASSWORD}@cluster0.mhrjm.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups'); // may have different name from DATABASE_NAME

    const result = await meetupsCollection.insertOne(data); // { title: ..., image: ..., ...}

    console.log(result);

    client.close();

    res.status(201).json({ message: 'Meetup inserted.' });
  }
}

export default handler;
