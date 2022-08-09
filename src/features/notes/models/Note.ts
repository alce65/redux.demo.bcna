export interface Note {
    id: string;
    title: string;
    content: string;
}

export interface NotePartialWithId {
    id: string;
    title?: string;
    content?: string;
}
