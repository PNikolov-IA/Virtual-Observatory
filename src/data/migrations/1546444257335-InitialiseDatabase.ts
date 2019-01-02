import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialiseDatabase1546444257335 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `projects` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(100) NOT NULL DEFAULT '', `description` varchar(200) NOT NULL DEFAULT '', UNIQUE INDEX `IDX_2187088ab5ef2a918473cb9900` (`name`), UNIQUE INDEX `IDX_6b35e73e223225aa97d84eaa66` (`description`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `firstName` varchar(20) NOT NULL, `lastName` varchar(20) NOT NULL, `isAdmin` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `object_types` (`id` int NOT NULL AUTO_INCREMENT, `type` varchar(20) NULL, UNIQUE INDEX `IDX_923fa33f25f848a968dd0bed96` (`type`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `spectral_types` (`id` int NOT NULL AUTO_INCREMENT, `type` varchar(20) NOT NULL, UNIQUE INDEX `IDX_b3a220bdbde46b9f12ee3ac61e` (`type`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `objects` (`id` int NOT NULL AUTO_INCREMENT, `identifier` varchar(20) NOT NULL, `coordinates` varchar(25) NOT NULL, `magnitude` float NULL, `objectTypeId` int NULL, `spectralTypeId` int NULL, `description` varchar(150) NOT NULL, UNIQUE INDEX `IDX_085111dece95f3c78a49a59bd7` (`identifier`), UNIQUE INDEX `IDX_011ac6ca94c6232c1eaa8b8423` (`coordinates`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `observations` (`id` int NOT NULL AUTO_INCREMENT, `date` datetime NOT NULL, `imagePath` varchar(255) NOT NULL DEFAULT '', `instrumentId` int NULL, `observerId` int NULL, `operatorId` int NULL, `objectId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `instruments` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(50) NOT NULL, `setupInfo` varchar(100) NULL, UNIQUE INDEX `IDX_2cfd43cad7a330c7cb45133ea1` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
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
        await queryRunner.query("DROP INDEX `IDX_2cfd43cad7a330c7cb45133ea1` ON `instruments`");
        await queryRunner.query("DROP TABLE `instruments`");
        await queryRunner.query("DROP TABLE `observations`");
        await queryRunner.query("DROP INDEX `IDX_011ac6ca94c6232c1eaa8b8423` ON `objects`");
        await queryRunner.query("DROP INDEX `IDX_085111dece95f3c78a49a59bd7` ON `objects`");
        await queryRunner.query("DROP TABLE `objects`");
        await queryRunner.query("DROP INDEX `IDX_b3a220bdbde46b9f12ee3ac61e` ON `spectral_types`");
        await queryRunner.query("DROP TABLE `spectral_types`");
        await queryRunner.query("DROP INDEX `IDX_923fa33f25f848a968dd0bed96` ON `object_types`");
        await queryRunner.query("DROP TABLE `object_types`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP INDEX `IDX_6b35e73e223225aa97d84eaa66` ON `projects`");
        await queryRunner.query("DROP INDEX `IDX_2187088ab5ef2a918473cb9900` ON `projects`");
        await queryRunner.query("DROP TABLE `projects`");
    }

}
