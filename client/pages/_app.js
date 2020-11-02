import 'bootstrap/dist/css/bootstrap.css';

import buildClient from '../api/build-client';
import Header from '../components/header';

/** NEXT-specific setup */
// <Component> = page we want to show
const AppComponent = ({ Component, pageProps, user }) => {
  return (
    <>
      <Header user={user}></Header>
      < Component {...pageProps} />
    </>
  );
};

AppComponent.getInitialProps = async appContext => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/user');

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  // console.log(pageProps);

  //will be passed back to pageProps
  return {
    pageProps,
    user: data.user
  };
};

export default AppComponent;
