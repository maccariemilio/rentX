import axios from "axios";

const api = axios.create({
  baseURL: "http://10.109.0.40:3333",
});

export { api };
