import { Appointment } from "../../models/Appointment";
import { Factory } from "./Factory";
import { faker } from "@faker-js/faker";

//-----------------------------------------------------------------------------

export class AppointmentFactory extends Factory<Appointment> {
  protected generate(): Appointment {

      const startDate = new Date("2024-05-01");
      const endDate = new Date("2024-12-20");
        return{
            appointmentDate: faker.date.between(startDate, endDate),
            userId: faker.number.int(),
            treatmentId: faker.number.int(),
            stylistId: faker.number.int()
        } as Appointment;
      }
    };