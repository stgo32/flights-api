import Router from 'koa-router';
import { Flight, PassengerSubdocument } from '../models/flights';
import type { Context } from 'koa';
import { Types } from 'mongoose';

const router = new Router({ prefix: '/flights/:flightId/passengers' });

router.post('/', async (ctx: Context) => {
  try {
    const flight = await Flight.findById(ctx.params.flightId);
    if (!flight) {
      ctx.status = 404;
      ctx.body = { error: 'Flight not found' };
      return;
    }

    const newPassenger = ctx.request.body as PassengerSubdocument;
    flight.passengers.push(newPassenger);
    await flight.save();

    ctx.status = 201;
    ctx.body = flight;
  } catch (err) {
    ctx.status = 400;
    ctx.body = { error: 'Failed to add passenger', details: err };
  }
});

router.get('/', async (ctx: Context) => {
  const flight = await Flight.findById(ctx.params.flightId);
  if (!flight) {
    ctx.status = 404;
    ctx.body = { error: 'Flight not found' };
    return;
  }
  ctx.body = flight.passengers;
});

router.get('/:passengerId', async (ctx: Context) => {
  const flight = await Flight.findById(ctx.params.flightId);
  if (!flight) {
    ctx.status = 404;
    ctx.body = { error: 'Flight not found' };
    return;
  }

  const passenger = flight.passengers.find(p =>
    p._id.equals(ctx.params.passengerId)
  );
  if (!passenger) {
    ctx.status = 404;
    ctx.body = { error: 'Passenger not found' };
    return;
  }

  ctx.body = passenger;
});

router.put('/:passengerId', async (ctx: Context) => {
  const flight = await Flight.findById(ctx.params.flightId);
  if (!flight) {
    ctx.status = 404;
    ctx.body = { error: 'Flight not found' };
    return;
  }

  const passenger = flight.passengers.find(p =>
    p._id.equals(ctx.params.passengerId)
  );
  if (!passenger) {
    ctx.status = 404;
    ctx.body = { error: 'Passenger not found' };
    return;
  }

  Object.assign(passenger, ctx.request.body);
  await flight.save();

  ctx.body = passenger;
});

router.delete('/:passengerId', async (ctx: Context) => {
  const flight = await Flight.findById(ctx.params.flightId);
  if (!flight) {
    ctx.status = 404;
    ctx.body = { error: 'Flight not found' };
    return;
  }

  const index = flight.passengers.findIndex(p =>
    p._id.equals(ctx.params.passengerId)
  );
  if (index === -1) {
    ctx.status = 404;
    ctx.body = { error: 'Passenger not found' };
    return;
  }

  flight.passengers.splice(index, 1);
  await flight.save();

  ctx.status = 200;
  ctx.body = { message: 'Passenger deleted successfully' };
});

export default router;
