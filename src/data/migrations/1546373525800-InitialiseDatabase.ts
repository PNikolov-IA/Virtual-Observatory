import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialiseDatabase1546373525800 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `object_types` CHANGE `type` `type` varchar(20) NULL");
        await queryRunner.query("DROP INDEX `IDX_011ac6ca94c6232c1eaa8b8423` ON `objects`");
        await queryRunner.query("ALTER TABLE `objects` DROP COLUMN `coordinates`");
        await queryRunner.query("ALTER TABLE `objects` ADD `coordinates` varchar(25) NOT NULL");
        await queryRunner.query("ALTER TABLE `objects` ADD UNIQUE INDEX `IDX_011ac6ca94c6232c1eaa8b8423` (`coordinates`)");
        await queryRunner.query("ALTER TABLE `objects` CHANGE `magnitude` `magnitude` float NULL");
        await queryRunner.query("ALTER TABLE `observations` CHANGE `date` `date` datetime NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `observations` CHANGE `date` `date` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `objects` CHANGE `magnitude` `magnitude` float(12) NULL");
        await queryRunner.query("ALTER TABLE `objects` DROP INDEX `IDX_011ac6ca94c6232c1eaa8b8423`");
        await queryRunner.query("ALTER TABLE `objects` DROP COLUMN `coordinates`");
        await queryRunner.query("ALTER TABLE `objects` ADD `coordinates` varchar(10) NOT NULL");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_011ac6ca94c6232c1eaa8b8423` ON `objects`(`coordinates`)");
        await queryRunner.query("ALTER TABLE `object_types` CHANGE `type` `type` varchar(20) NULL");
    }

}
