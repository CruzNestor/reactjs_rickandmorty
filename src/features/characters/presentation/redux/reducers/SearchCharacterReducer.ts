import { createSlice } from '@reduxjs/toolkit'
import { searchCharacter } from '../controllers/CharacterController';
import { CharacterEntity } from '../../../domain/entities/CharacterEntity';


export interface searchInitialStateSlice {
  data: CharacterEntity | null;
  loading: boolean;
  error: string | null;
}

const searchInitialState: searchInitialStateSlice = {
  data: null,
  error: null,
  loading: false
}

export const searchCharacterSlice = createSlice({
  name: 'SearchCharacterSlice',
  initialState: searchInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchCharacter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchCharacter.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(searchCharacter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
})

export default searchCharacterSlice.reducer