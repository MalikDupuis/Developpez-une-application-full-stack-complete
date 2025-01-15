import { Comments } from "./comments.interface";

export interface Article {
    id: number;
    theme: string;
    title: string;
    content: string;
    author: string;
    created: string;
    comments?: Comments[]
  }
  