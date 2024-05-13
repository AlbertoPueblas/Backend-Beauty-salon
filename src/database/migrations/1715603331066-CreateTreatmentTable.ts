import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTreatmentTable1715603331066 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
           new Table({
              name: "treatsment",
              columns: [
                 {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                 },
                 {
                    name: "treatsment",
                    type: "varchar",
                    length: "255",
                 },
                 {
                    name: "price",
                    type: "int",
                 },
                 
              ],
           }),
           true
        );
     }
  
     public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("treatsment");
     }

}
