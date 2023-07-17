export interface Note {
    id: string;
    title: string;
    content: string;
    tags: string[];
    lastModified: number;
    favorite: boolean;
    notebookId: string;
    accessIDs: string[];
}