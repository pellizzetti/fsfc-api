import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoutesModule } from './routes/routes.module';
import {
  ExpressCassandraModule,
  ExpressCassandraModuleOptions,
} from '@iaminfinity/express-cassandra';

const cassandraOptions: ExpressCassandraModuleOptions = {
  clientOptions: {
    contactPoints: ['127.0.0.1'],
    protocolOptions: { port: 9042 },
    keyspace: 'fsfc',
    queryOptions: {
      consistency: 1,
    },
  },
  ormOptions: {
    createKeyspace: true,
    defaultReplicationStrategy: {
      class: 'SimpleStrategy',
      replication_factor: 1,
    },
    migration: 'alter',
    udts: {
      position: {
        lat: 'double',
        long: 'double',
      },
    },
  },
};

@Module({
  imports: [
    ConfigModule.forRoot(),
    RoutesModule,
    ExpressCassandraModule.forRoot(cassandraOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
