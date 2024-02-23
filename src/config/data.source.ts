// import { DataSource, DataSourceOptions } from 'typeorm';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

// ConfigModule.forRoot({
//   envFilePath: `.${process.env.NODE_ENV.trim()}.env`,
// });

// const configServise = new ConfigService();

// export const DataSourceConfig: DataSourceOptions = {
//   type: 'postgres',
//   host: configServise.get('DB_HOST'),
//   port: configServise.get('DB_PORT'),
//   username: configServise.get('DB_USER'),
//   password: configServise.get('DB_PASSWORD'),
//   database: configServise.get('DB_NAME'),
//   entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
//   migrations: [__dirname + '/../migrations/*{.ts,.js}'],
//   synchronize: true,
//   migrationsRun: true,
//   logging: false,
//   namingStrategy: new SnakeNamingStrategy(),
// };

// export const AppDS = new DataSource(DataSourceConfig);



import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const renderDBConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'dpg-cncg83qcn0vc73f1o3jg-a.oregon-postgres.render.com',
  port: 5432,
  username: 'elsolnec_user',
  password: '9UiqKKAcjdKyA5alv5ROsk3rwhyLUH3j',
  database: 'elsolnec',
  entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  synchronize: true,
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export const AppDS = new DataSource(renderDBConfig);
