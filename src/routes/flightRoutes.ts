import Router from 'koa-router';
import { Flight, FlightDocument } from '../models/flights';
import type { Context } from 'koa';

const router = new Router({ prefix: '/flights' });

router.get('/', async (ctx: Context) => {
  ctx.body = await Flight.find();
});

router.get('/:id', async (ctx: Context) => {
  const flight = await Flight.findById(ctx.params.id);
  if (!flight) {
    ctx.status = 404;
    ctx.body = { error: 'Flight not found' };
    return;
  }
  ctx.body = flight;
});

router.post('/', async (ctx: Context) => {
  try {
    const newFlight = new Flight(ctx.request.body);
    const savedFlight = await newFlight.save();
    ctx.status = 201;
    ctx.body = savedFlight;
  } catch (err) {
    ctx.status = 400;
    ctx.body = { error: 'Invalid flight data', details: err };
  }
});

router.put('/:id', async (ctx: Context) => {
  try {
    const updatedFlight = await Flight.findByIdAndUpdate(
      ctx.params.id,
      ctx.request.body as Partial<FlightDocument>,
      { new: true, runValidators: true }
    );
    if (!updatedFlight) {
      ctx.status = 404;
      ctx.body = { error: 'Flight not found' };
      return;
    }
    ctx.body = updatedFlight;
  } catch (err) {
    ctx.status = 400;
    ctx.body = { error: 'Update failed', details: err };
  }
});

router.delete('/:id', async (ctx: Context) => {
  const deleted = await Flight.findByIdAndDelete(ctx.params.id);
  if (!deleted) {
    ctx.status = 404;
    ctx.body = { error: 'Flight not found' };
    return;
  }
  ctx.status = 200;
  ctx.body = { message: 'Flight deleted successfully' };
});

export default router;
