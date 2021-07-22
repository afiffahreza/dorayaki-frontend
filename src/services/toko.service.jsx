import http from "../http-common";

class TokoDataService {
  getAll() {
    return http.get("/toko");
  }

  get(id) {
    return http.get(`/toko/${id}`);
  }

  create(data) {
    return http.post("/toko", data);
  }

  update(id, data) {
    return http.put(`/toko/${id}`, data);
  }

  delete(id) {
    return http.delete(`/toko/${id}`);
  }

  findByQuery(prov) {
    return http.get(`/toko?prov=${prov}`);
  }
}

export default new TokoDataService();