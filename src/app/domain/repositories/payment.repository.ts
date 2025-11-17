import { Payment } from "@domain/models/payment.model";
import { CrudRepository } from "./common/crud.repository";

export interface PaymentRepository extends CrudRepository<Payment> {}