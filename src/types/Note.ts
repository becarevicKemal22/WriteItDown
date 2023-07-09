export interface Note {
    id: number;
    title: string;
    content: string;
    tags: string[];
    lastModified: number;
    favorite: boolean;
    notebookId: number;
}