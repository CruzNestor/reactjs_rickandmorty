import { createSlice } from '@reduxjs/toolkit'
import { getCharacters } from '../controllers/CharacterController';
import { CharacterEntity } from '../../../domain/entities/CharacterEntity';


export interface initialStateSlice {
  data: CharacterEntity | null;
  loading: boolean;
  error: string | null;
}

const initialState: initialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const characterSlice = createSlice({
  name: 'CharacterSlice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
})

export default characterSlice.reducer