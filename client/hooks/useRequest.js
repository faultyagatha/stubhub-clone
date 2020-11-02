import { useState } from 'react';
import axios from 'axios';

/** @function useRequest: custom hook for requests to backend
 * @argument method: string POST | PATCH | GET ...*/
export const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);
      //const response = await axios.post(url, body);
      console.log(method);

      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
      if (err.response) {
        console.log(err.response);
        setErrors(
          <div className="alert alert-danger">
            <h4>"Aw, Snap!"</h4>
            <ul className="my-0">
              {err.response.data.errors.map(e => (
                <li key={e.message}>{e.message}</li>
              ))}
            </ul>
          </div>
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
    }
  };
  return { doRequest, errors };
};