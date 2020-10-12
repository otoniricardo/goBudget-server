import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateSuppliers1602461360680
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'suppliers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'supplier_name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'contact_name',
            type: 'varchar',
          },
          {
            name: 'contact_email',
            type: 'varchar',
          },
          {
            name: 'contact_phone',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('suppliers');
  }
}
