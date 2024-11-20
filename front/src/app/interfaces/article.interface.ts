export interface Article {
    id: number;
    theme: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt?: Date;
  }
  