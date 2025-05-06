import { generateKeyPairSync } from 'crypto';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

function ensureDir(dir: string): void {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
}

function generateKeys(): void {
  const keysDir = join(__dirname, '../keys');
  ensureDir(keysDir);

  // Gera par de chaves RSA de 2048 bits
  const { publicKey, privateKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    },
  });

  const privPath = join(keysDir, 'private.key');
  const pubPath = join(keysDir, 'public.key');

  writeFileSync(privPath, privateKey, { mode: 0o600 });
  writeFileSync(pubPath, publicKey, { mode: 0o644 });

  console.log('Chaves geradas em:');
  console.log(`   • Private → ${privPath}`);
  console.log(`   • Public  → ${pubPath}`);
}

generateKeys();
