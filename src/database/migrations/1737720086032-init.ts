import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1737720086032 implements MigrationInterface {
    name = 'Init1737720086032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" ADD "comment" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP COLUMN "comment"`);
    }

}
