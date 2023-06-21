import { createAsyncThunk } from '@reduxjs/toolkit'
import { CharacterEntity } from '../../../domain/entities/CharacterEntity';
import { CharacterDataSourceImpl } from '../../../data/datasources/CharacterDataSource';
import CharacterRepositoryImpl from '../../../data/repositories/CharacterRepositoryImpl';
import GetCharactersUseCase from '../../../domain/usecases/GetCharactersUseCase';
import SearchCharacterUseCase from '../../../domain/usecases/SearchCharacterUseCase';

const service = new CharacterDataSourceImpl()
const repository = new CharacterRepositoryImpl(service)

const useCases = {
  getCharacters: new GetCharactersUseCase(repository),
  searchCharacter: new SearchCharacterUseCase(repository)
}

export const getCharacters = createAsyncThunk<CharacterEntity, string, { rejectValue: string }>(
  "character/getAll",
  async (url, thunkAPI) => {
    try {
      const data = await useCases.getCharacters.handle(url);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch");
    }
  }
);

export const searchCharacter = createAsyncThunk<CharacterEntity, string, { rejectValue: string }>(
  "character/search",
  async (url, thunkAPI) => {
    try {
      const data = await useCases.searchCharacter.handle(url);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(`${error}`);
    }
  }
);