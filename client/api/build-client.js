import axios from 'axios';

export default ({ req }) => {
  if (typeof window === 'undefined') {
    //check if the function is executed on a server
    //window object exists only in the client

    //return axios instance
    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers
    });
  } else {
    // we must be on the browser
    return axios.create({
      baseUrl: '/'
    });
  }
};
