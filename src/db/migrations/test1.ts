import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class datasheet1580764074492 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'Datasheets',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true
          },
          {
            name: 'product',
            type: 'varchar'
          },
          {
            name: 'type',
            type: 'varchar'
          },
          {
            name: 'status',
            type: 'varchar'
          },
          {
            name: 'sku',
            type: 'varchar'
          },
          {
            name: 'description',
            type: 'varchar'
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('Datasheets');
  }
}
