import { useEffect, useState } from 'react';

import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG/1280px-Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG',
    address: 'Some address 5',
    description: 'This is a First Meetup',
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG/1280px-Frauenkirche_and_Neues_Rathaus_Munich_March_2013.JPG',
    address: 'Some address 10',
    description: 'This is a Second Meetup',
  },
];

function HomePage(props) {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   // send http request and fetch data
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);

  return <MeetupList meetups={props.meetups} />;
}

// If we fetch data after rendering the Component that we want to show in the Source Code in the Browser:
// This function is called BEFORE the Component function!
// If async -> Next.js will wait for this data to be loaded, before it executes the Comp. function!
export async function getStaticProps() {
  // fetch data from an API
  return {
    // these props will be set as props of the Page Component:
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
}

export default HomePage;
