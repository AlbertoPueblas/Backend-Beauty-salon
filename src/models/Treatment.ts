import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Appointment } from "./Appointment";

@Entity("treatment")
export class Treatment extends BaseEntity {
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
