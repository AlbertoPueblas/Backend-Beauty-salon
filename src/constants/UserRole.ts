import { Role } from "../models/Role";

//---------------------------------------------

export const UserRoles = {
    ADMIN: { id:1, name: "Admin" } as Role,
    STYLIST: { id:2, name: "Stylist" } as Role,
    CLIENT: { id:3, name: "Client" } as Role,
    TREATSMENT: {id:4, name: "Treatsment"} as Role,
    APPOINTMENT: {id:5, name: "Appointment"} as Role,
};