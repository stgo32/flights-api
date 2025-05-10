import mongoose, { Schema, Document } from 'mongoose';

interface Passenger {
  id: number;
  name: string;
  hasConnections: boolean;
  age: number;
  flightCategory: 'Black' | 'Platinum' | 'Gold' | 'Normal';
  reservationId: string;
  hasCheckedBaggage: boolean;
}

export interface FlightDocument extends Document {
  flightCode: string;
  passengers: Passenger[];
}

const passengerSchema = new Schema<Passenger>(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    hasConnections: { type: Boolean, required: true },
    age: { type: Number, required: true },
    flightCategory: {
      type: String,
      enum: ['Black', 'Platinum', 'Gold', 'Normal'],
      required: true,
    },
    reservationId: { type: String, required: true },
    hasCheckedBaggage: { type: Boolean, required: true },
  },
  { _id: false }
);

const flightSchema = new Schema<FlightDocument>(
  {
    flightCode: { type: String, required: true },
    passengers: { type: [passengerSchema], required: true },
  },
  { timestamps: true }
);

export const Flight = mongoose.model<FlightDocument>('Flight', flightSchema);
