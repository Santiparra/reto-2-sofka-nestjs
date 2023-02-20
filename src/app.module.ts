import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { InvoiceModule } from './invoice/invoice.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [CustomerModule, InvoiceModule, MongooseModule.forRoot("mongodb://127.0.0.1:27017/sofka-reto-2")],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
