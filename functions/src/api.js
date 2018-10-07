// @flow
import axios from 'axios';

// const API_URL: string = "https://3d4d270d.ngrok.io";
const API_URL: string = "http://127.0.0.1:3000";


const get = (uri: string): Promise<Object> => {
  return new Promise((r, re) => {
    axios.get(API_URL + uri).then(r).catch(re);
  });
}

export { get };
