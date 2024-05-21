import { SeederConfig } from "../../config/seeders";
import { getRandomValueFromArray, getUsersAccordingRole } from "../../helpers/common";
import { Seeder } from "./Seeders";
import { Users } from "../../models/Users";
import { AppointmentFactory } from "../factories/AppointmentFactory";
import { Appointment } from "../../models/Appointment";
import { Treatment } from "../../models/Treatment";

//------------------------------------------------------------------------------

export class AppointmentSeeder extends Seeder {
   protected async generate(): Promise<void> {
      const { APPOINTMENT } = SeederConfig;

      const users = await Users.find();
      const treatments = await Treatment.find();

      const stylist=getUsersAccordingRole(users,2);
        const clients=getUsersAccordingRole(users,3);

      const dates = new AppointmentFactory().createMany(APPOINTMENT);

      dates.forEach((date) => {
         date.treatment = getRandomValueFromArray(treatments);
         date.client = getRandomValueFromArray(clients);
         date.stylist = getRandomValueFromArray(stylist);

      });

      await Appointment.save(dates);
   }
};
