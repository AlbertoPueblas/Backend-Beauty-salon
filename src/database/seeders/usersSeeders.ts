import { SeederConfig } from "../../config/seeders"
import { UserRole } from "../../constants/UserRole";
import { Users } from "../../models/Users";
import { UserFactory } from "../factories/UserFactory";
import { Seeder } from "./Seeders"

//------------------------------------------------------------------------------

export class UsersSeeder extends Seeder {
   protected async generate(): Promise<void> {
      const { ADMINS, STYLIST, CLIENT,  } =
      SeederConfig;

      const usersFactory = new UserFactory();
      
      //admin
      const adminUsers = usersFactory.createMany(ADMINS);
      adminUsers.forEach((user, i) =>{
         user.role = UserRole.ADMIN;
         user.email = `admin${i + 1}@admin.com`;

      });

      //Managers
      const stylistUsers = usersFactory.createMany(STYLIST);
      stylistUsers.forEach((user, i) =>{
         user.role = UserRole.STYLIST;
         user.email = `stylist${i + 1}@manager.com`;
      });

      //Clients
      const clientUsers = usersFactory.createMany(CLIENT);
      clientUsers.forEach((user) =>{
         user.role = UserRole.CLIENT;

      });

      //Save users
      const allUsers = [...adminUsers,...stylistUsers,...clientUsers];
      await Users.save(allUsers);
   }
};
