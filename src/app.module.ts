import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import configuration from './configuration/config';
import { NodemailerModule } from './node-mailer/nodemailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   playground: false,
    //   definitions: {
    //     path: join(process.cwd(), 'src/graphql.ts'),
    //   },
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),

    //   plugins: [ApolloServerPluginLandingPageLocalDefault()],
    // }),

    NodemailerModule.forRoot({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'mss.rajnikant1993@gmail.com',
        pass: 'jqpbajqwzpnardvw',
      },
      name: 'gmail',
    }),
    NodemailerModule.forRoot({
      host: 'smtp.outlook.com',
      port: 587,
      secure: false,
      auth: {
        user: 'mss.rajnikant1993@gmail.com',
        pass: 'jqpbajqwzpnardvw',
      },
      name: 'outlook',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
