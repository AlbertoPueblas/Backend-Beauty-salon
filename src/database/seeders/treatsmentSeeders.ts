import { SeederConfig } from "../../config/seeders";
import { Treatment } from "../../models/Treatment";
import { TreatmentFactory } from "../factories/TreatmentFactory";
import { Seeder } from "./Seeders";

//------------------------------------------------------------------------------

export class TreatmentSeeder extends Seeder {
   protected async generate(): Promise<void> {
      const { TREATMENT } = SeederConfig;

      const treatment = new TreatmentFactory().createMany(TREATMENT);

      await Treatment.save(treatment);
   }
}
