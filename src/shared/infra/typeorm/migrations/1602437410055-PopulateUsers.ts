import { MigrationInterface, QueryRunner } from 'typeorm';

import HashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashprovider';

const hashProvider = new HashProvider();

export default class PopulateUsers1602437410055 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `insert into users (name, email, password) values ('ricardo', 'ricardo@agrotudo.agr.br',
      '${await hashProvider.generateHash('123456')}' );`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `delete from users where email='ricardo@agrotudo.agr.br';`,
    );
  }
}
