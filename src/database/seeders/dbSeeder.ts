import { AppointmentSeeder } from "./appointmentSeeders";
import { RoleSeeder } from "./roleSeeders";
import { UsersSeeder } from "./usersSeeders";
import { TreatmentSeeder } from "./treatsmentSeeders"

//--------------------------------------------


(async () => {
    console.log("Inicializing seeders");

    await new RoleSeeder().start();
    await new UsersSeeder().start();
    await new TreatmentSeeder().start()
    await new AppointmentSeeder().start()
    
})();