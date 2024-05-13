import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "./Role";

@Entity("users")
export class Users {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "first_name" })
    firstName!: string;

    @Column({ name: "last_name" })
    lastName!: string;

    @Column({ name: "email" })
    email!: string;

    @Column({ name: "password", select:false })
    password!: string;

    @Column({ name: "phone" })
    phone!: string;

    @Column({ name: "is_active" })
    isActive!: string;

    @Column({ name: "role_id" })
    role!: Role;
}
