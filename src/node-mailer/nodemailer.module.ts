import { DynamicModule, Module, Provider } from '@nestjs/common';
import {
  ASYNC_OPTIONS_TYPE,
  ConfigurableModuleClass,
  DEFAULT_NODEMAILER_TOKEN,
  OPTIONS_TYPE,
  getNodemailerOptionsToken,
  getNodemailerProviderToken,
} from './constrants';
import { TransportOptions, createTransport } from 'nodemailer';

@Module({})
export class NodemailerModule extends ConfigurableModuleClass {
  private static readonly TAG = NodemailerModule.name;

  static forRoot(options: typeof OPTIONS_TYPE): DynamicModule {
    const dynamicModule = super.forRoot(options);
    const transportInstance = this.createNodemailerTransport(options.name);

    return {
      global: true,
      module: dynamicModule.module,
      imports: dynamicModule.imports,
      providers: [...dynamicModule.providers, transportInstance],
      exports: [transportInstance],
    };
  }

  static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE): DynamicModule {
    const dynamicModule = super.forRootAsync(options);
    const transportInstance = this.createNodemailerTransport(options.name);

    return {
      global: true,
      module: dynamicModule.module,
      imports: dynamicModule.imports,
      providers: [...dynamicModule.providers, transportInstance],
      exports: [transportInstance],
    };
  }

  private static createNodemailerTransport(
    name = DEFAULT_NODEMAILER_TOKEN,
  ): Provider {
    return {
      provide: getNodemailerProviderToken(name),
      inject: [getNodemailerOptionsToken(name)],
      useFactory: (option: TransportOptions) => {
        return createTransport(option);
      },
    };
  }
}
