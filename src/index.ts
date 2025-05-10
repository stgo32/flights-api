import Koa from 'koa';
import Router from 'koa-router';
import { connectDB } from './db/config';
import bodyParser from 'koa-bodyparser';
import flightRoutes from './routes/flightRoutes';
import passengerRoutes from './routes/passengerRoutes';


connectDB();
const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(flightRoutes.routes());
app.use(passengerRoutes.routes());

app.use(flightRoutes.allowedMethods());
app.use(passengerRoutes.allowedMethods());

router.get('/', async (ctx) => {
  ctx.body = { message: 'Hello World!' };
});

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
