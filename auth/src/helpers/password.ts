import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buffer = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buffer.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword: string, candidatePassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buffer = (await scryptAsync(candidatePassword, salt, 64)) as Buffer;

    return buffer.toString('hex') === hashedPassword;
  }
};