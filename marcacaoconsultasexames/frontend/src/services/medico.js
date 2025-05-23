class MedicoService {
    constructor(axios, BACKEND_URL) {
      this.BACKEND_URL = BACKEND_URL;
      this.axios = axios;
     }
    async get () {
        const result = await this.axios.get(`${this.BACKEND_URL}/medicos`);
        console.log("Oi")
        return result.data;
    }
    async getById (id) {
        const result = await this.axios.get(`${this.BACKEND_URL}/medicos/${id}`);
        console.log("Oi")
        return result.data;
    }
    async getMedicosByEspecialidade (especialidade) {
        const result = await this.axios.get(`${this.BACKEND_URL}/medicos/especialidade/${especialidade}`);
        console.log("Oi")
        return result.data;
    }
    async add(item) {
        const result = await this.axios.post(`${this.BACKEND_URL}/medicos`,item);
        return true
    }
    async update(atual, novo) {
        const result = await this.axios.patch(`${this.BACKEND_URL}/medicos/${atual.id}`, novo);
        return true
    }
    async remove(item) {
        const result = await this.axios.delete(`${this.BACKEND_URL}/medicos/${item.id}`);
        return true
    }
  }
module.exports = MedicoService; 