import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Users } from "./Users";
import { Treatsment } from "./Treatsment";

@Entity("appointment")
export class Appointment {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column({ name:"appointment_date" })
    appointmentDate!: Date;

    @Column({ name:"user_id" })
    userId!: number;

    @Column({ name:"treatment_id" })
    treatmentId!: number;

    @Column({ name:"stylist_id" })
    stylistId!: number;

    //Relations 
    @ManyToOne(() => Users, (user) => user.clientDates)
    @JoinColumn({ name: "user:id"})
    client!: Users;

    @ManyToOne(() => Treatsment, (treatsment) => treatsment.appointment)
    @JoinColumn({ name:"treatment_id"})
    treatment!: Treatsment

    @ManyToOne(() => Users, (user) => user.stylist)
    stylist!:Users;
}
