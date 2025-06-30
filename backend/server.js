import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Carga el archivo .env desde la carpeta backend
dotenv.config({ path: path.join(__dirname, '.env') });
console.log('🔐 TOKEN CARGADO:', process.env.MP_ACCESS_TOKEN);

if (!process.env.MP_ACCESS_TOKEN) {
  console.error('❌ No se encontró el token de Mercado Pago. Verifica el archivo .env');
}

const app = express();
app.use(cors());
app.use(express.json());

// SDK v2.8+
const mp = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN
});

app.post('/crear-preferencia', async (req, res) => {
  try {
    const { productos } = req.body;

    const preference = {
      items: productos.map(p => ({
        title: p.name,
        unit_price: Number(p.price),
        quantity: Number(p.quantity),
        currency_id: 'CLP'
      })),
      back_urls: {
        success: 'http://localhost:5173/success',
        failure: 'http://localhost:5173/failure',
        pending: 'http://localhost:5173/pending'
      },
      auto_return: 'approved'
    };

    const response = await new Preference(mp).create({ body: preference });

    res.json({ id: response.id });
  } catch (error) {
    console.error('❌ Error al crear preferencia:', error);
    res.status(500).json({ error: 'Error al crear preferencia' });
  }
});

app.listen(4000, () => {
  console.log('✅ Servidor backend corriendo en http://localhost:4000');
});
