import { Treatment } from "../../models/Treatment";
import { Factory } from "./Factory";
import { faker } from "@faker-js/faker";

//------------------------------------------------------------------------------

export class TreatmentFactory extends Factory<Treatment> {
    protected generate(): Treatment {
        return{
            treatment: faker.lorem.sentence({min:1 , max:3}).toString(),
            price: faker.number.float({min:10, max:100})
        } as Treatment;
      }
    }