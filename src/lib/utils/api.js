import axios from 'axios';

export default async ({
  method, url, data, params, headers,
}) => {
  try {
    const result = await axios({
      method,
      url,
      baseURL: 'https://express-training.herokuapp.com/',
      data,
      params,
      headers,
    });
    if (result) {
      return result;
    }
  } catch (err) {
    throw err.response;
  }
  return null;
};
