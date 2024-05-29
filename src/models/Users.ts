import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Role } from "./Role";
import { Appointment } from "./Appointment";
import { Treatment } from "./Treatment";

//-------------------------------------------------------------

@Entity("users")
export class Users extends BaseEntity {
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
    isActive!: boolean;

    @Column({ name: "role_id" })
    roleId!: number;

    @Column({ name: "registration_date_time", default: () => "CURRENT_TIMESTAMP" }) // Nueva columna para la fecha y hora de registro
    registrationDateTime!: Date;

    //Relation

    @ManyToOne(() => Role, (role) => role.users )
    @JoinColumn({ name:"role_id" })
    role!: Role;

    @OneToMany(() => Appointment, (appointment) => appointment.client)
    clientDates?: Appointment[];

    @OneToMany(() => Appointment, (appointment) => appointment.stylist)
    stylist?: Users;
}
