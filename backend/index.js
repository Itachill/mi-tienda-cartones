const express = require('express');
const mercadopago = require('mercadopago');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

app.post('/crear-preferencia', async (req, res) => {
  try {
    const { products } = req.body;

    const items = products.map(product => ({
      title: product.nombre,
      quantity: product.cantidad,
      currency_id: "CLP",
      unit_price: product.precio,
    }));

    const preference = {
      items,
      back_urls: {
        success: "http://localhost:5173/success",
        failure: "http://localhost:5173/failure",
        pending: "http://localhost:5173/pending",
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);
    res.status(200).json({ id: response.body.id });

  } catch (error) {
    console.error('Error al crear preferencia:', error.message);
    res.status(500).json({ error: "No se pudo crear la preferencia" });
  }
});

app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
