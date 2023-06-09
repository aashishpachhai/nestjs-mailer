import { Inject } from '@nestjs/common';
import {
  DEFAULT_NODEMAILER_TOKEN,
  getNodemailerProviderToken,
} from './constrants';

export function InjectNodemailer(token = DEFAULT_NODEMAILER_TOKEN) {
  return Inject(getNodemailerProviderToken(token));
}
