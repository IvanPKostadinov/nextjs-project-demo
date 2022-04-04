import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

// const DUMMY_MEETUPS = [
//   {
//     id: 'm1',
//     title: 'A First Meetup',
//     image:
//       'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG/1280px-Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG',
//     address: 'Some address 5',
//     description: 'This is a First Meetup',
//   },
// ];

function HomePage(props) {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   // send http request and fetch data
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
          name='description'
          content='Find a huge list of active meetups!'
        />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const req = context.req;  // incoming Request
//   const res = context.res;  // Response

//   // fetch data from an API. May use credentials

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

// If we fetch data after rendering the Component that we want to show in the Source Code in the Browser:
// This function is called BEFORE the Component function!
// If async -> Next.js will wait for this data to be loaded, before it executes the Comp. function!
export async function getStaticProps() {
  const USER_NAME = 'ivanpkostadinov';
  const USER_PASSWORD = 'FsFvDlScnESbAXI9';
  const DATABASE_NAME = 'meetups';

  // fetch data from an API
  const client = await MongoClient.connect(
    `mongodb+srv://${USER_NAME}:${USER_PASSWORD}@cluster0.mhrjm.mongodb.net/${DATABASE_NAME}?retryWrites=true&w=majority`
  );
  const db = client.db();

  const meetupsCollection = db.collection('meetups'); // may have different name from DATABASE_NAME

  const meetups = await meetupsCollection.find().toArray();

  return {
    // these props will be set as props of the Page Component:
    props: {
      // meetups: DUMMY_MEETUPS,
      // we .map() because of the auto-generated _id in mongodb
      meetups: meetups.map((meetup) => ({
        id: meetup._id.toString(),
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
      })),
      // out page will be auto re-generated on the Server every 10 seconds:
      revalidate: 10,
    },
  };
}

export default HomePage;
