import buildClient from '../api/build-client';

/** executed on a browser */
const LandingPage = ({ user }) => {
  console.log(user);
  return <h1>Landing Page</h1>;
};

/** executed either on a server or on a client - url must be adjusted */
LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/user');
  return data;
};

export default LandingPage;