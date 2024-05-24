import { Treatment } from "../../models/Treatment";
import { Factory } from "./Factory";
import { faker } from "@faker-js/faker";

//------------------------------------------------------------------------------

export class TreatmentFactory extends Factory<Treatment> {
  protected generate(): Treatment {

    const beauty = [
      'Manicura simple',
      'Manicura completa',
      'Pedicura',
      'Depilación',
      'Exfoliación',
      'Tinte y corte',
      'Cortes de caballero',
      'Tratamiento capilar',
      'Peinado Curly',
      'Corte en capas',
      'Recogido',
      'Peinado Trenzas',
      'Peinado Liso',
    ]

    return {
      treatment: faker.helpers.arrayElement(beauty),
            price: faker.number.float({ min: 10, max: 200 })
    } as Treatment;
  }
}