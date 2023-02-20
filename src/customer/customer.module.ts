import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerController } from './controllers/customer.controller';
import { CustomerSchema } from './schemas/customer.schema';
import { CustomerService } from './services/customer.service';

@Module({
  imports: [MongooseModule.forFeature([
    {name: "customer", schema: CustomerSchema}
  ])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
