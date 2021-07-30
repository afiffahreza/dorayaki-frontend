import axios from "axios";

export default axios.create({
  baseURL: "http://165.22.58.239:8080/api/v1",
  headers: {
    "Content-type": "application/json"
  }
});
