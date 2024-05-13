import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Appointment } from "./Appointment";

@Entity("treatsment")
export class Treatsment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name:"treatsment" })
    treatsment!: string;

    @Column({ name:"price" })
    price!: number;

    //Relation

    @OneToMany(() => Appointment, (appointment) => appointment.treatsment)
    appointment?: Appointment[];
}
