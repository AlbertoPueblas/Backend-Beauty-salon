import { Role } from "../models/Role";

//---------------------------------------------

export const UserRole = {
    ADMIN: { id:1, name: "Admin" } as Role,
    STYLIST: { id:2, name: "Stylist" } as Role,
    CLIENT: { id:3, name: "Client" } as Role,
    TREATMENT: {id:4, name: "Treatment"} as Role,
    APPOINTMENT: {id:5, name: "Appointment"} as Role,
};