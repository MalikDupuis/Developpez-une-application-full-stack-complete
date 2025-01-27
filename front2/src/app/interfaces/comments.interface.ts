export interface Comments {
    id?: number;
    articleId: number;
    content: string;
    authorId?: number;
    author?: string;
}