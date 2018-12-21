import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialDatabase1545376612259 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("ALTER TABLE `observations` CHANGE `date` `date` datetime NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `observations` CHANGE `date` `date` datetime(0) NOT NULL");
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`(`email`)");
    }

}
