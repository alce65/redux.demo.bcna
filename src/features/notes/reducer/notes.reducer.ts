import { createReducer } from '@reduxjs/toolkit';
import { Note } from '../models/Note';
import * as act from './action.creators';
import { actionTypes } from './action.types';

// Este sería el esquema de un reducer
// export const notesReducer = (state: any, action: any ) => {
//     return state
// }

const initialState: Array<Note> = [
    {
        id: '',
        title: '',
        content: '',
    },
];

// const oldReducer = (state, action) => {
//     switch (action.type) {
//         case actionTypes.notesLoad:
//             return  action.payload
//         default:
//             break;
//     }

// }

export const notesReducer = createReducer(initialState, (builder) => {
    builder.addCase(act.loadNotesAction, (_state, action) => action.payload);
    builder.addCase(act.createNoteAction, (state, action) => [
        ...state,
        action.payload,
    ]);
    builder.addCase(act.deleteNoteAction, (state, action) =>
        state.filter((item) => String(item.id) !== action.payload)
    );
    builder.addCase(act.updateNoteAction, (state, action) =>
        state.map((item) =>
            item.id !== action.payload.id
                ? item
                : { ...item, ...action.payload }
        )
    );
    builder.addDefaultCase((state: Array<Note>) => [...state]);
});
