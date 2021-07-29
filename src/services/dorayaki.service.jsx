import http from "../http-common";

class DorayakiDataService {
    getAll() {
        return http.get("/dorayaki/");
    }

    get(id) {
        return http.get(`/dorayaki/${id}`);
    }

    create(data) {
        return http.post("/dorayaki/", data);
    }

    update(id, data) {
        return http.put(`/dorayaki/${id}`, data);
    }

    delete(id) {
        return http.delete(`/dorayaki/${id}`);
    }
}

export default new DorayakiDataService();