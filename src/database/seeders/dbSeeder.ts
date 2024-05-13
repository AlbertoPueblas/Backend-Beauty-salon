import { AppointmentSeeder } from "./AppointmentSeeders";
import { RoleSeeder } from "./RoleSeeders";
import { UsersSeeder } from "./UsersSeeders";
import { TreatsmentSeeder } from "./TreatsmentSeeders"

//--------------------------------------------


(async () => {
    console.log("Inicializing seeders");

    await new RoleSeeder().start();
    await new UsersSeeder().start();
    await new TreatsmentSeeder().start()
    await new AppointmentSeeder().start()
    
})();