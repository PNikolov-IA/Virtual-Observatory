import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialDatabase1545167467815 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `roles` (`id` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`id` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `object_types` (`id` varchar(255) NOT NULL, `type` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `spectral_types` (`id` varchar(255) NOT NULL, `type` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `objects` (`id` varchar(255) NOT NULL, `identifier` varchar(255) NOT NULL, `coordinates` varchar(255) NOT NULL, `magnitude` int NULL, `objectTypeId` varchar(255) NULL, `spectralTypeId` varchar(255) NULL, `description` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `observations` (`id` varchar(255) NOT NULL, `date` datetime NOT NULL, `imagePath` varchar(255) NOT NULL, `instrumentId` varchar(255) NULL, `observerId` varchar(255) NULL, `operatorId` varchar(255) NULL, `objectId` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `instruments` (`id` varchar(255) NOT NULL, `name` varchar(255) NOT NULL, `setupInfo` varchar(255) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users_roles` (`usersId` varchar(255) NOT NULL, `rolesId` varchar(255) NOT NULL, PRIMARY KEY (`usersId`, `rolesId`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `objects` ADD CONSTRAINT `FK_d8c900f2947e443b01914371667` FOREIGN KEY (`objectTypeId`) REFERENCES `object_types`(`id`)");
        await queryRunner.query("ALTER TABLE `objects` ADD CONSTRAINT `FK_2f8b349974adfda2a0b5d8b72af` FOREIGN KEY (`spectralTypeId`) REFERENCES `spectral_types`(`id`)");
        await queryRunner.query("ALTER TABLE `observations` ADD CONSTRAINT `FK_e2412e831bf09e7484775ff6ca3` FOREIGN KEY (`instrumentId`) REFERENCES `instruments`(`id`)");
        await queryRunner.query("ALTER TABLE `observations` ADD CONSTRAINT `FK_11b388285cd0bf1e3a711cebb50` FOREIGN KEY (`observerId`) REFERENCES `users`(`id`)");
        await queryRunner.query("ALTER TABLE `observations` ADD CONSTRAINT `FK_2de71f882d2e566165a1baa4a2a` FOREIGN KEY (`operatorId`) REFERENCES `users`(`id`)");
        await queryRunner.query("ALTER TABLE `observations` ADD CONSTRAINT `FK_3491657e790e7f3e95146024ef8` FOREIGN KEY (`objectId`) REFERENCES `objects`(`id`)");
        await queryRunner.query("ALTER TABLE `users_roles` ADD CONSTRAINT `FK_deeb1fe94ce2d111a6695a2880e` FOREIGN KEY (`usersId`) REFERENCES `users`(`id`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `users_roles` ADD CONSTRAINT `FK_21db462422f1f97519a29041da0` FOREIGN KEY (`rolesId`) REFERENCES `roles`(`id`) ON DELETE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users_roles` DROP FOREIGN KEY `FK_21db462422f1f97519a29041da0`");
        await queryRunner.query("ALTER TABLE `users_roles` DROP FOREIGN KEY `FK_deeb1fe94ce2d111a6695a2880e`");
        await queryRunner.query("ALTER TABLE `observations` DROP FOREIGN KEY `FK_3491657e790e7f3e95146024ef8`");
        await queryRunner.query("ALTER TABLE `observations` DROP FOREIGN KEY `FK_2de71f882d2e566165a1baa4a2a`");
        await queryRunner.query("ALTER TABLE `observations` DROP FOREIGN KEY `FK_11b388285cd0bf1e3a711cebb50`");
        await queryRunner.query("ALTER TABLE `observations` DROP FOREIGN KEY `FK_e2412e831bf09e7484775ff6ca3`");
        await queryRunner.query("ALTER TABLE `objects` DROP FOREIGN KEY `FK_2f8b349974adfda2a0b5d8b72af`");
        await queryRunner.query("ALTER TABLE `objects` DROP FOREIGN KEY `FK_d8c900f2947e443b01914371667`");
        await queryRunner.query("DROP TABLE `users_roles`");
        await queryRunner.query("DROP TABLE `instruments`");
        await queryRunner.query("DROP TABLE `observations`");
        await queryRunner.query("DROP TABLE `objects`");
        await queryRunner.query("DROP TABLE `spectral_types`");
        await queryRunner.query("DROP TABLE `object_types`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `roles`");
    }

}
