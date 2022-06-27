import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { Route } from './entities/route.entity';
import { ExpressCassandraModule } from '@iaminfinity/express-cassandra';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RoutesGateway } from './routes.gateway';

@Module({
  imports: [
    ExpressCassandraModule.forFeature([Route]),
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        useFactory: (): any => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: process.env.KAFKA_CLIENT_ID,
              brokers: [process.env.KAFKA_BOOTSTRAP_SERVERS],
              ssl: process.env.KAFKA_SECURITY_PROTOCOL === 'SASL_SSL' && true,
              sasl: {
                mechanism: process.env.KAFKA_SASL_MECHANISM,
                username: process.env.KAFKA_SASL_USERNAME,
                password: process.env.KAFKA_SASL_PASSWORD,
              },
            },
            consumer: {
              groupId:
                !process.env.KAFKA_CONSUMER_GROUP_ID ||
                process.env.KAFKA_CONSUMER_GROUP_ID === ''
                  ? 'api-' + Math.random()
                  : process.env.KAFKA_CONSUMER_GROUP_ID,
            },
          },
        }),
      },
    ]),
  ],
  controllers: [RoutesController],
  providers: [RoutesService, RoutesGateway],
})
export class RoutesModule {}
