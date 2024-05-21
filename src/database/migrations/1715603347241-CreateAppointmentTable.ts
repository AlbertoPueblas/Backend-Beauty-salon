import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAppointmentTable1715603347241 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
           new Table({
              name: "appointment",
              columns: [
                 {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                 },
                 {
                    name: "appointment_date",
                    type: "datetime",
                 },
                 {
                    name: "user_id",
                    type: "int",
                 },      
                 {
                    name: "treatment_id",
                    type: "int",
                 },
                 {
                  name: "stylist_id",
                  type: "int",
                  },
              ],
              foreignKeys: [
                 {
                    columnNames: ["user_id"],
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    onDelete:"CASCADE"
                 },                 
                 {
                  columnNames: ["treatment_id"],
                  referencedTableName: "treatment",
                  referencedColumnNames: ["id"],
                  },
                  {
                     columnNames: ["stylist_id"],
                     referencedTableName: "users",
                     referencedColumnNames: ["id"],
                  },
              ],
           }),
           true
        );
     }
  
     public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("appointment");
     }

}
