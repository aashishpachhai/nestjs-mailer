import { ConfigurableModuleBuilder, Provider } from '@nestjs/common';
import { TransportOptions, createTransport } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export const DEFAULT_NODEMAILER_TOKEN = 'default-nodemailer';

export const {
  ConfigurableModuleClass,
  ASYNC_OPTIONS_TYPE,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<SMTPTransport | SMTPTransport.Options>()
  .setClassMethodName('forRoot')
  .setExtras({ name: '' }, (defination, extras) => {
    console.log(defination);
    const optionProvider = defination.providers[0] as Provider;
    extras.name ||= DEFAULT_NODEMAILER_TOKEN;
    console.log(JSON.stringify(defination));

    if ('provide' in optionProvider)
      optionProvider.provide = `${optionProvider.provide.toString()}-options-${
        extras.name
      }`;
    console.log(JSON.stringify(defination));

    return defination;
  })
  .build();

export function getNodemailerOptionsToken(name = DEFAULT_NODEMAILER_TOKEN) {
  return `${MODULE_OPTIONS_TOKEN.toString()}-options-${name}`;
}

export function getNodemailerProviderToken(name = DEFAULT_NODEMAILER_TOKEN) {
  return `${MODULE_OPTIONS_TOKEN.toString()}-provider-${name}`;
}
