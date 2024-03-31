import { Logger } from 'pino';
import dotenv from 'dotenv';

dotenv.config();

export const retrieveEnvVariable = (variableName: string, logger: Logger) => {
  const variable = process.env[variableName] || '';
  if (!variable) {
    logger.error(`${variableName} is not set`);
    process.exit(1);
  }
  return variable;
};

export function convertNumber(num: number): string {
  if (Number.isInteger(num)) {
    return num.toFixed(2);
  }

  const str = num.toString();
  const match = str.match(/^(\d+)(\.(\d+))?[eE]([-\+]?\d+)$/);
  if (!match) return str;

  const [, integer, , tail, exponentStr] = match;
  const exponent = Number(exponentStr);
  const realInteger = integer + (tail || '');

  if (exponent > 0) {
    const realExponent = Math.abs(exponent + integer.length);
    return realInteger.padEnd(realExponent, '0');
  } else {
    const realExponent = Math.abs(exponent);

    return `0.0(${realExponent - 1})${realInteger}`;
  }
}
