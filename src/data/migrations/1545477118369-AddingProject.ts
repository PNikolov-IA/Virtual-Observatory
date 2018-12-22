import {MigrationInterface, QueryRunner} from "typeorm";

export class AddingProject1545477118369 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `projects` CHANGE `description` `description` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `observations` CHANGE `date` `date` datetime NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `observations` CHANGE `date` `date` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `projects` CHANGE `description` `description` varchar(255) NOT NULL");
    }

}
