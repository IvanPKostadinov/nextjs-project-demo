import { MongoClient, ObjectId } from 'mongodb';

import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails(props) {
  return (
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}

export async function getStaticPaths() {
  const USER_NAME = 'ivanpkostadinov';
  const USER_PASSWORD = 'FsFvDlScnESbAXI9';
  const DATABASE_NAME = 'meetups';

  const client = await MongoClient.connect(
    `mongodb+srv://${USER_NAME}:${USER_PASSWORD}@cluster0.mhrjm.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups'); // may have different name from DATABASE_NAME

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    // [
    //   {
    //     params: {
    //       meetupId: 'm1',
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: 'm2',
    //     },
    //   },
    // ],
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId; // contains the dynamic URL part

  // this will be only seen in the terminal(on the Developer Server-side), not in the Browser
  console.log(meetupId);

  const USER_NAME = 'ivanpkostadinov';
  const USER_PASSWORD = 'FsFvDlScnESbAXI9';
  const DATABASE_NAME = 'meetups';

  const client = await MongoClient.connect(
    `mongodb+srv://${USER_NAME}:${USER_PASSWORD}@cluster0.mhrjm.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups'); // may have different name from DATABASE_NAME

  const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
      // meetupData: {
      //   image:
      //     'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG/1280px-Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG',
      //   id: meetupId,
      //   title: 'A first meetup',
      //   address: 'Some street 5',
      //   description: 'The meetup description.',
      // },
    },
  };
}

export default MeetupDetails;
