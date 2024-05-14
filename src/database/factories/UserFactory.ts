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
        phone: faker.string.numeric("/\n{3}-\n{3}-\n{4}/"),// formato XXX-XXX-XXXX
        password:  bcrypt.hashSync("123456", 10),
      } as Users;
   }
}
