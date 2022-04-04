import { useRouter } from 'next/router';
import Head from 'next/head';
import { Fragment } from 'react';

import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    // fetch('path-to-file')
    const response = await fetch('/api/new-meetup', {
      method: 'POST', // req.method
      body: JSON.stringify(enteredMeetupData), // req.body
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    console.log(data);

    router.push('/');
  }

  return (
    <Fragment>
      <Head>
        <title>New Meetup</title>
        <meta
          name='description'
          content='Add new meetups!'
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default NewMeetupPage;
