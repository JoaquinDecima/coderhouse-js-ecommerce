import express from 'express';

// SetUp del entorno
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Aplicacion inicio en https://localhost:${PORT}`)
})
