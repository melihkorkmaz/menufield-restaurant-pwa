import axios from "axios";

const baseApiUrl = "https://www.silversandspizza.com/node-api/v1";

const get = endpoint => axios.get(`${baseApiUrl}${endpoint}`).then(x => x.data);
const post = endpoint => data =>
  axios.post(`${baseApiUrl}${endpoint}`, data).then(x => x.data);

export { get, post };
