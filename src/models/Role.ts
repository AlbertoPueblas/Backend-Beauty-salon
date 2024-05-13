import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Users } from "./Users";

//-------------------------------------------------------------------

@Entity("roles")
export class Role {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({name: "name"})
    name!: string;

    //Relation

    @OneToMany(() => Users, (user) => user.role )
    users?: Users[];
}


