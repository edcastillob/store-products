import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1706630932897 implements MigrationInterface {
    name = 'Init1706630932897'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."product_type_enum" AS ENUM('Perecedero', 'No_perecedero')`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "price" integer NOT NULL, "type" "public"."product_type_enum" NOT NULL, CONSTRAINT "UQ_22cc43e9a74d7498546e9a63e77" UNIQUE ("name"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "store" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "city" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "UQ_66df34da7fb037e24fc7fee642b" UNIQUE ("name"), CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_store" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "product_id" uuid, "store_id" uuid, CONSTRAINT "PK_4fb20f5e0d195dcc2e27e8cc815" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "product_store" ADD CONSTRAINT "FK_9f3d186a9731a15c7a9a52218aa" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_store" ADD CONSTRAINT "FK_7733838f2aa47a580841471e346" FOREIGN KEY ("store_id") REFERENCES "store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_store" DROP CONSTRAINT "FK_7733838f2aa47a580841471e346"`);
        await queryRunner.query(`ALTER TABLE "product_store" DROP CONSTRAINT "FK_9f3d186a9731a15c7a9a52218aa"`);
        await queryRunner.query(`DROP TABLE "product_store"`);
        await queryRunner.query(`DROP TABLE "store"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TYPE "public"."product_type_enum"`);
    }

}
