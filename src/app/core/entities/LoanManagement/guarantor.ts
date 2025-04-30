import { Loan } from "./loan";

export class Guarantor {
  id!: number;
  fullName!: string;             // Nom complet du garant
  nationalId!: string;           // CIN ou passeport
  phoneNumber!: string;          // Numéro de téléphone
  relationship!: string;         // Lien avec l'emprunteur
  monthlyIncome!: number;        // Revenu mensuel
  //bankCardNumber!: string;       // Numéro de carte bancaire
  email!: string;
  approuved!: boolean;           // Note: spelling preserved from backend
  userId!: number;

  incomeProof!: Uint8Array;      // Justificatif de revenu
  commitmentLetter!: Uint8Array; // Lettre d'engagement

  loan!: Loan;                   // Associated Loan (optional chaining can be added if needed)
 
}
