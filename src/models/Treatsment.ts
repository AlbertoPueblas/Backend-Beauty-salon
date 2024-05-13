import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Appointment } from "./Appointment";

@Entity("treatment")
export class Treatsment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name:"treatment" })
    treatment!: string;

    @Column({ name:"price" })
    price!: number;

    //Relation

    @OneToMany(() => Appointment, (appointment) => appointment.treatment)
    appointment?: Appointment[];
}
