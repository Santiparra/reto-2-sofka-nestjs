import { Injectable, NotFoundException } from '@nestjs/common';
import { Customer } from '../types/customer';
import { CustomerDto } from '../dto/customer.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerSchema } from '../schemas/customer.schema';

@Injectable()
export class CustomerService {
    constructor(@InjectModel("customer") private customerModel: Model<Customer>) {}

    async buscarCustomers(): Promise<Customer[]> {
        const customers = await this.customerModel.find();
        return  customers
    }

    async buscarCustomer (customerID: number): Promise<Customer> {
        const customer = await this.customerModel.findById(customerID);
        return customer
    }

    async crearCustomer (customerDto: CustomerDto): Promise<Customer> {
        const customer = new this.customerModel(customerDto);
        await customer.save();
        return customer
    }

    async editarCustomer (customerID: number, customerDto: CustomerDto): Promise<Customer> {
        const customerEditado = await this.customerModel
        .findByIdAndUpdate(customerID, customerDto, { new: true });
        return customerEditado
    }

    async actualizarCustomer (customerID: number, customerDto: CustomerDto) {
        const customerActualizado = await this.customerModel
        .findByIdAndUpdate(customerID, customerDto)
        .setOptions({ overwrite: true, new: true })
        .populate("nombre")
        .populate("email")
        .populate("registrado")
        .populate("saldoCuenta");
        if (!customerActualizado) {
            throw new NotFoundException();
          };
        return customerActualizado
    }

    async borrarCustomer (customerID: number): Promise<Customer> {
        const customerBorrado = await this.customerModel.findByIdAndDelete(customerID);
        return customerBorrado
    }

}
