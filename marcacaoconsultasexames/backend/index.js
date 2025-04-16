import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import usersRoutes from "./src/routes/usuarios.js";
import medicosRoutes from "./src/routes/medicos.js";
import especialidadesRoutes from "./src/routes/especialidades.js";
// import consultasRoutes from "./src/routes/consultas.js";

const app = express();
const PORT = 5000;




app.use(cors({
    origin:"http://localhost:3000",
    methods:["GET, POST", "DELETE", "PATCH", "PUT"],
}));
app.use(bodyParser.json());
app.use("/usuarios", usersRoutes);
app.use("/especialidades", especialidadesRoutes);
app.use("/medicos", medicosRoutes);
// app.use("/consultas", consultasRoutes);
app.get("/", (req, res) => {
    res.send("Bem vindo a API de Usuários")
});
// app.all("/(.*)/", (req, res) =>res.send("Essa página não existe."));

app.listen(PORT, () =>console.log(`Servidor executando em: http://localhost:${PORT}`));