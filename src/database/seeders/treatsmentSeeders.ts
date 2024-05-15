import { SeederConfig } from "../../config/seeders";
import { Treatsment } from "../../models/Treatsment";
import { TreatsmentFactory } from "../factories/TreatsmentFactory";
import { Seeder } from "./Seeders";

//------------------------------------------------------------------------------

export class TreatsmentSeeder extends Seeder {
   protected async generate(): Promise<void> {
      const { TREATSMENT } = SeederConfig;

      const treatsment = new TreatsmentFactory().createMany(TREATSMENT);

      await Treatsment.save(treatsment);
   }
}
