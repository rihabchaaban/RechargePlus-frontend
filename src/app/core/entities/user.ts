import { Account } from "./LoanManagement/account";


export class User {
  idUser!: number;
  name!: string;
  email!: string;
  password!: string;
  role!: string;
  address!: string;
  mobile_number!: string;
  birth_date!: Date;
  registered_at!: Date;
  country!: string;
  status!: string; // e.g., 'active', 'inactive', 'banned'
  face_photo!: Uint8Array;
  national_identity_card!: Uint8Array;

  accounts!: Account[];

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }

  // Optional helper method
  isActive(): boolean {
    return this.status === 'active';
  }
}
