import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm';

export class spec1580797753497 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'Specs',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true
          },
          {
            name: 'title',
            type: 'varchar'
          },
          {
            name: 'type',
            type: 'varchar'
          },
          {
            name: 'section',
            type: 'varchar'
          },
          {
            name: 'data',
            type: 'varchar'
          },
          {
            name: 'order',
            type: 'int'
          },
          {
            name: 'datasheetId',
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

    await queryRunner.createForeignKey(
      'Specs',
      new TableForeignKey({
        columnNames: ['datasheetId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Datasheets'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('Specs');
  }
}
