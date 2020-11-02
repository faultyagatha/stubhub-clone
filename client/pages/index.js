import buildClient from '../api/build-client';

/** executed on a browser */
const LandingPage = ({ user }) => {
  return user ? (
    <h1>You are signed in</h1>
  ) : (
      <h1>You are not signed in</h1>
    );
};

/** executed either on a server or on a client - url must be adjusted */
LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/user');
  return data;
};

export default LandingPage;