import axios from "axios";
const production =
  "https://mendel3.bii.a-star.edu.sg/METHODS/corona/gamma/cgi-bin/cgi_tree.py";

// const test = "http://localhost:8000/cgi-bin/cgi_tree.py";

export const generateTree = (data) => {
  // return axios.post(test, data);
  return axios.post(production, data);
};
