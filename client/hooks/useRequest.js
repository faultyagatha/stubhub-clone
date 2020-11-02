import { useState } from 'react';
import axios from 'axios';

/** @function useRequest: custom hook for requests to backend
 * @argument method: string POST | PATCH | GET ...*/
export const useRequest = ({ url, method, body }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);

      if (onSuccess) {
        onSuccess(response.data);
      }
      return response.data;
    } catch (err) {
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
    }
  };
  return { doRequest, errors };
};