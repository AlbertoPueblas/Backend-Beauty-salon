import { UserRole } from "../../constants/UserRole";
import { Role } from "../../models/Role";
import { Seeder } from "./Seeders";

//------------------------------------------------------------------------------

export class RoleSeeder extends Seeder {
   protected async generate(): Promise<void> {
      const roles: Partial<Role>[] = [
         UserRole.ADMIN,
         UserRole.STYLIST,
         UserRole.CLIENT,
      ];

      await Role.save(roles);
   }
}
