import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Customer } from '../types/customer';
import { CustomerDto } from '../dto/customer.dto';

@Injectable()
export class CustomerService {
    customers: Customer[] = []

    buscarCustomers(): Customer[] {
        const customers = this.customers;
        return  customers
    }

    buscarCustomer (customerNombre: string): Customer {
        const customer = this.customers.filter(customer => customer.nombre == customerNombre);
        return customer[0]
    }

    crearCustomer (customerDto: CustomerDto): Customer {
        this.customers.push(customerDto)
        return customerDto
    }

    editarCustomer (customerNombre: string, customerDto: CustomerDto): Customer {
        const customerAEditar = this.buscarCustomer(customerNombre);
        if (!customerAEditar) throw new HttpException("no se pudo editar el customer", HttpStatus.NOT_FOUND) 
        const indice = this.customers.indexOf(customerAEditar);
        const newCustomerData = { ...customerAEditar, ...customerDto }
        this.customers.splice(indice, 1, newCustomerData)
        return newCustomerData
    }

    actualizarCustomer (customerNombre: string, customerDto: CustomerDto) {
        const customerAEditar = this.buscarCustomer(customerNombre);
        if (!customerAEditar) throw new HttpException("no se pudo editar el customer", HttpStatus.NOT_FOUND) 
        const indice = this.customers.indexOf(customerAEditar);
        this.customers.splice(indice, 1, customerDto)
        return customerDto
    }

    borrarCustomer (customerNombre: string): Customer {
        const customerABorrar = this.customers.find(customer => customer.nombre == customerNombre);
        if (!customerABorrar) throw new HttpException("no se pudo editar el customer", HttpStatus.NOT_FOUND) 
        this.customers = this.customers.filter(customer => customer.nombre != customerNombre);
        return customerABorrar
    }

}
