import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

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
}
