import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialDatabase1546071708485 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `projects` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `description` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `isAdmin` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `object_types` (`id` int NOT NULL AUTO_INCREMENT, `type` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `spectral_types` (`id` int NOT NULL AUTO_INCREMENT, `type` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `objects` (`id` int NOT NULL AUTO_INCREMENT, `identifier` varchar(255) NOT NULL, `coordinates` varchar(255) NOT NULL, `magnitude` int NULL, `objectTypeId` int NULL, `spectralTypeId` int NULL, `description` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `observations` (`id` int NOT NULL AUTO_INCREMENT, `date` datetime NOT NULL, `imagePath` varchar(255) NOT NULL, `instrumentId` int NULL, `observerId` int NULL, `operatorId` int NULL, `objectId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `instruments` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `setupInfo` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `projects_observations` (`projectsId` int NOT NULL, `observationsId` int NOT NULL, PRIMARY KEY (`projectsId`, `observationsId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `objects` ADD CONSTRAINT `FK_d8c900f2947e443b01914371667` FOREIGN KEY (`objectTypeId`) REFERENCES `object_types`(`id`)");
        await queryRunner.query("ALTER TABLE `objects` ADD CONSTRAINT `FK_2f8b349974adfda2a0b5d8b72af` FOREIGN KEY (`spectralTypeId`) REFERENCES `spectral_types`(`id`)");
        await queryRunner.query("ALTER TABLE `observations` ADD CONSTRAINT `FK_e2412e831bf09e7484775ff6ca3` FOREIGN KEY (`instrumentId`) REFERENCES `instruments`(`id`)");
        await queryRunner.query("ALTER TABLE `observations` ADD CONSTRAINT `FK_11b388285cd0bf1e3a711cebb50` FOREIGN KEY (`observerId`) REFERENCES `users`(`id`)");
        await queryRunner.query("ALTER TABLE `observations` ADD CONSTRAINT `FK_2de71f882d2e566165a1baa4a2a` FOREIGN KEY (`operatorId`) REFERENCES `users`(`id`)");
        await queryRunner.query("ALTER TABLE `observations` ADD CONSTRAINT `FK_3491657e790e7f3e95146024ef8` FOREIGN KEY (`objectId`) REFERENCES `objects`(`id`)");
        await queryRunner.query("ALTER TABLE `projects_observations` ADD CONSTRAINT `FK_6ffb8f7cb874fe5915e0bf38ab1` FOREIGN KEY (`projectsId`) REFERENCES `projects`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `projects_observations` ADD CONSTRAINT `FK_3bbb1de85289be77153fef5b35f` FOREIGN KEY (`observationsId`) REFERENCES `observations`(`id`) ON DELETE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `projects_observations` DROP FOREIGN KEY `FK_3bbb1de85289be77153fef5b35f`");
        await queryRunner.query("ALTER TABLE `projects_observations` DROP FOREIGN KEY `FK_6ffb8f7cb874fe5915e0bf38ab1`");
        await queryRunner.query("ALTER TABLE `observations` DROP FOREIGN KEY `FK_3491657e790e7f3e95146024ef8`");
        await queryRunner.query("ALTER TABLE `observations` DROP FOREIGN KEY `FK_2de71f882d2e566165a1baa4a2a`");
        await queryRunner.query("ALTER TABLE `observations` DROP FOREIGN KEY `FK_11b388285cd0bf1e3a711cebb50`");
        await queryRunner.query("ALTER TABLE `observations` DROP FOREIGN KEY `FK_e2412e831bf09e7484775ff6ca3`");
        await queryRunner.query("ALTER TABLE `objects` DROP FOREIGN KEY `FK_2f8b349974adfda2a0b5d8b72af`");
        await queryRunner.query("ALTER TABLE `objects` DROP FOREIGN KEY `FK_d8c900f2947e443b01914371667`");
        await queryRunner.query("DROP TABLE `projects_observations`");
        await queryRunner.query("DROP TABLE `instruments`");
        await queryRunner.query("DROP TABLE `observations`");
        await queryRunner.query("DROP TABLE `objects`");
        await queryRunner.query("DROP TABLE `spectral_types`");
        await queryRunner.query("DROP TABLE `object_types`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `projects`");
    }

}
