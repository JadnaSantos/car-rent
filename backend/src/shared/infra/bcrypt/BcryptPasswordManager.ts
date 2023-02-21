
import bcrypt from 'bcrypt';
import { PasswordCompare } from '../../../modules/contracts/PasswordCompare';
import { PasswordEncrypter } from '../../../modules/contracts/PasswordEncrypter';

class BcryptPassowrdManager implements PasswordCompare, PasswordEncrypter {
  private readonly _salt: number;
  private readonly _bycrpt: typeof bcrypt;

  constructor(salt: number) {
    this._salt = salt;
    this._bycrpt = bcrypt;
  }

  encrypt = async (password: string): Promise<string> => {
    return await this._bycrpt.hash(password, this._salt);
  };

  compare = async (password: string, hash: string): Promise<boolean> => {
    return await this._bycrpt.compare(password, hash);
  };
}

export { BcryptPassowrdManager };
