import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

const app = express();
const PORT = process.env.PORT || 3001;
const DB_PATH = path.join(process.cwd(), 'backend', 'db.json');

app.use(cors());
app.use(express.json());

function loadDB() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, '[]');
  }
  const data = fs.readFileSync(DB_PATH, 'utf-8');
  return JSON.parse(data);
}

function saveDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

async function sendEmail(cotizacion) {
  // Configurar el transporte según tus credenciales reales
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST || 'smtp.example.com',
    port: process.env.MAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER || 'user@example.com',
      pass: process.env.MAIL_PASS || 'password'
    }
  });

  const productos = cotizacion.productos
    .map(p => `${p.name} x ${p.quantity}`)
    .join('\n');

  const text = `Nombre: ${cotizacion.nombre}\n` +
    `RUT: ${cotizacion.rut}\n` +
    `Correo: ${cotizacion.correo}\n` +
    `Productos:\n${productos}\n` +
    `Total estimado: ${cotizacion.total}`;

  const message = {
    from: 'no-reply@trasherbox.cl',
    to: 'ventas@trasherbox.cl',
    subject: 'Nueva Cotizaci\u00f3n',
    text
  };

  await transporter.sendMail(message);
}

app.post('/api/cotizacion', async (req, res) => {
  const cotizacion = req.body;
  const db = loadDB();
  db.push({ ...cotizacion, fecha: new Date().toISOString() });
  saveDB(db);

  try {
    await sendEmail(cotizacion);
  } catch (e) {
    console.error('Error enviando correo', e);
  }

  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
