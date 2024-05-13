import { Treatsment } from "../../models/Treatsment";
import { Factory } from "./Factory";
import { faker } from "@faker-js/faker";

//------------------------------------------------------------------------------

export class TreatsmentFactory extends Factory<Treatsment> {
    protected generate(): Treatsment {
        return{
            treatment: faker.lorem.sentence({min:1 , max:3}),
        } as Treatsment;
      }
    }