const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.get("/cep/:cep", async (req, res) => {
    const { cep } = req.params;
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        const address = response.data;

        if (address.erro) {
            const message = "CEP não encontado!";
            return res.status(404).json({ message });
        }

        const result = {
            cep: address.cep,
            street: address.logradouro,
            city: address.localidade,
            state: address.uf
        };

        res.json({ result });
    } catch(err) {
        const message = "Erro ao constar cep";
        res.status(500).json({message});
    }
});

app.listen(PORT);