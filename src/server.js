import express from 'express';
import cartRouter from './routers/cartRouter.js';
import productRouter from './routers/productRouter.js';

// SetUp del entorno
const app = express();
const PORT = process.env.PORT || 8080;

// Configuro la App Express
app.use(express.urlencoded({ extended: true }));

// Configuro las Rutas
app.use('/api/carrito', cartRouter);
app.use('/api/productos', productRouter);

// Inicio la Aplicacion
app.listen(PORT, () => {
  console.log(`Aplicacion inicio en http://localhost:${PORT}`);
})
