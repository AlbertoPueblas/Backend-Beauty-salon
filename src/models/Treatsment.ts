import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("treatment")
export class Treatsment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name:"treatment" })
    treatment!: string;

    @Column({ name:"price" })
    price!: number;
}
