import React, { useEffect } from 'react';
import Router from 'next/router';

import { useRequest } from '../../hooks/useRequest';

const Signout = () => {

  const { doRequest, errors } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/')
  });

  useEffect(() => {
    doRequest();
  }, []);

  if (errors) console.log(errors);

  return (
    <div>
      Signing out
    </div>
  )
}

export default Signout;
