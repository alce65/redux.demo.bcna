import { createAction } from '@reduxjs/toolkit';
import { Note } from '../models/Note';
import { actionTypes } from './action.types';

// Así sería sin toolkit
// const loadNotesAction = (notes: Array<Note>) => ({
//     type: actionTypes.load,
//     payload: notes,
// });

export const loadNotesAction = createAction<Array<Note>>(actionTypes.notesLoad);

export const createNoteAction = createAction<Note>(actionTypes.notesCreate);

export const updateNoteAction = createAction<Partial<Note>>(
    actionTypes.notesUpdate
);

export const deleteNoteAction = createAction<Note['id']>(
    actionTypes.notesDelete
);

// export const  = createAction<Array<anyCharacter>>(
//     actionTypes['character@load']
// );
