// domain.com/api/new-meetup

function handler(req, res) {
  if (req.method === 'POST') {
    // triggered in: POST to domain.com/api/new-meetup
    const data = req.data;
    
    const { title, image, address, description } = data;
  }
}

export default handler;