import { Users } from "../../models/Users";
import { Factory } from "./Factory";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

//------------------------------------------------------------------------------

export class UserFactory extends Factory<Users> {
   protected generate(): Users {
      return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number('6##-##-##-##'),
        password:  bcrypt.hashSync("123456", 10),
        registrationDateTime: faker.date.past()
      } as Users;
   }
}
