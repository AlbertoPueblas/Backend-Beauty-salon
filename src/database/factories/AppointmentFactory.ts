import { Appointment } from "../../models/Appointment";
import { Factory } from "./Factory";
import { faker } from "@faker-js/faker";

//-----------------------------------------------------------------------------

export class AppointmentFactory extends Factory<Appointment> {
    protected generate(): Appointment {
        return{
            appointmentDate: faker.date.future(),
            userId: faker.number.int(),
            treatsmentId: faker.number.int(),
            stylistId: faker.number.int()
        } as Appointment;
      }
    }