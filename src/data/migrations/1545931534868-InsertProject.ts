import {MigrationInterface, QueryRunner} from "typeorm";

export class InsertProject1545931534868 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `observations` CHANGE `date` `date` datetime NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `observations` CHANGE `date` `date` datetime(0) NOT NULL");
    }

}
