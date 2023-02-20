import { Document } from "mongoose";

export interface Customer extends Document{
    readonly nombre: string;
    readonly email: string;
    readonly registrado: boolean;
    readonly saldoCuenta: number;
}