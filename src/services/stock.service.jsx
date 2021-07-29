import http from "../http-common";

class StockDataService {
    getAll() {
        return http.get("/stock/");
    }

    getByStoreID(id) {
        return http.get(`/stock/toko/${id}`);
    }

    create(data) {
        return http.post("/stock/", data);
    }

    update(id, data) {
        return http.put(`/stock/${id}`, data);
    }

    delete(id) {
        return http.delete(`/stock/${id}`);
    }
}

export default new StockDataService();