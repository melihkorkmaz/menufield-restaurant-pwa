import axios from "axios";

const baseApiUrl = "https://www.silversandspizza.com/node-api/v1";

const get = endpoint => axios.get(`${baseApiUrl}${endpoint}`).then(x => x.data);

export { get };
