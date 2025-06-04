import * as bcrypt from 'bcryptjs';

export async function hash(plainText: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(plainText, saltRounds);
}

export async function compare(
  plainText: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(plainText, hash);
}
