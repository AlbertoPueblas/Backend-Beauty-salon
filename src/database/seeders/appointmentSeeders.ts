import { SeederConfig } from "../../config/seeders";
import { getRandomValueFromArray, getUsersAccordingRole } from "../../helpers/common";
import { Seeder } from "./Seeders";
import { Users } from "../../models/Users";
import { AppointmentFactory } from "../factories/AppointmentFactory";
import { Appointment } from "../../models/Appointment";
import { Treatsment } from "../../models/Treatsment";

//------------------------------------------------------------------------------

export class AppointmentSeeder extends Seeder {
   protected async generate(): Promise<void> {
      const { APPOINTMENT } = SeederConfig;

      const users = await Users.find();
      const treatsments = await Treatsment.find();

      const stylist=getUsersAccordingRole(users,2);
        const clients=getUsersAccordingRole(users,3);

      const dates = new AppointmentFactory().createMany(APPOINTMENT);

      dates.forEach((date) => {
         date.treatsment = getRandomValueFromArray(treatsments);
         date.client = getRandomValueFromArray(clients);
         date.stylist = getRandomValueFromArray(stylist);

      });

      await Appointment.save(dates);
   }
};
