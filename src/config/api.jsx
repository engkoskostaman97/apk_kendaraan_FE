import axios from "axios";

export const API = axios.create(
  // {
  //   baseURL: "https://virtuous-energy-production.up.railway.app/api/v1",
  // }
    {
    baseURL: process.env.REACT_APP_BASEURL,
  }
);
