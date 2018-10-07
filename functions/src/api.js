// @flow
import axios from 'axios';

const API_URL: string = "https://cocktaildesk-back.herokuapp.com";


const get = (uri: string): Promise<Object> => {
  return new Promise((r, re) => {
    axios.get(API_URL + uri).then(r).catch(re);
  });
}

export { get };
