import { Schema } from "mongoose";

export const CustomerSchema = new Schema({
    nombre: String,
    email: String,
    registrado: Boolean,
    saldoCuenta: Number,
});