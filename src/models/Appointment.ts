import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Users } from "./Users";
import { Treatsment } from "./Treatsment";

@Entity("appointment")
export class Appointment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name:"appointment_date" })
    appointmentDate!: Date;

    @Column({ name:"user_id" })
    userId!: number;

    @Column({ name:"treatsment_id" })
    treatsmentId!: number;

    @Column({ name:"stylist_id" })
    stylistId!: number;

    //Relations 
    @ManyToOne(() => Users, (user) => user.clientDates)
    @JoinColumn({ name: "user_id"})
    client!: Users;

    @ManyToOne(() => Treatsment, (treatsment) => treatsment.appointment)
    @JoinColumn({ name:"treatsment_id"})
    treatsment!: Treatsment

    @ManyToOne(() => Users, (user) => user.stylist)
    @JoinColumn({ name: "stylist_id"})
    stylist!:Users;
}
