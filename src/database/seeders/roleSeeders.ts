import { UserRoles } from "../../constants/UserRole";
import { Role } from "../../models/Role";
import { Seeder } from "./Seeders";

//------------------------------------------------------------------------------

export class RoleSeeder extends Seeder {
   protected async generate(): Promise<void> {
      const roles: Partial<Role>[] = [
         UserRoles.ADMIN,
         UserRoles.STYLIST,
         UserRoles.CLIENT,
      ];

      await Role.save(roles);
   }
}
