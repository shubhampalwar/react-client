import axios from 'axios';

export default async (method, url, data) => {
  try {
    const result = await axios({
      method,
      url,
      baseURL: 'https://express-training.herokuapp.com/api/user',
      data,
    });
    if (result) {
      return result;
    }
  } catch (err) {
    throw err.response;
  }
  return null;
};
