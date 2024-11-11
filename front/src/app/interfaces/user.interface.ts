export interface User {
    id: number;
    email: string;
    nom: string;
    password: string;
    createdAt: Date;
    updatedAt?: Date;
  }
  