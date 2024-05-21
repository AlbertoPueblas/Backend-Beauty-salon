import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Users } from "./Users";
import { Treatment } from "./Treatment";

@Entity("appointment")
export class Appointment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

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
    @JoinColumn({ name: "user_id"})
    client!: Users;

    @ManyToOne(() => Treatment, (treatment) => treatment.appointment)
    @JoinColumn({ name:"treatment_id"})
    treatment!: Treatment

    @ManyToOne(() => Users, (user) => user.stylist)
    @JoinColumn({ name: "stylist_id"})
    stylist!:Users;
}
