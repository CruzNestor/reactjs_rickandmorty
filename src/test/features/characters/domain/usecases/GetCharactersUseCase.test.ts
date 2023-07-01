import { CharacterDataSourceImpl } from "../../../../../features/characters/data/datasources/CharacterDataSource"
import CharacterRepositoryImpl from "../../../../../features/characters/data/repositories/CharacterRepositoryImpl"
import { CharacterEntity } from "../../../../../features/characters/domain/entities/CharacterEntity"
import GetAllCharactersUseCase from "../../../../../features/characters/domain/usecases/GetCharactersUseCase"

const fakeGetCharacter = async (url: string) : Promise<CharacterEntity> => {
  if(url === ''){
    throw new TypeError('error')
  }
  const result: CharacterEntity = {
    currentPage: 1,
    info: {},
    results: [],
    searchText: null
  }
  return result
}

describe('GetCharacterUseCase', () => {
  const tSource = new CharacterDataSourceImpl()
  const tRepository = new CharacterRepositoryImpl(tSource)
  const mockGetCharacters = jest.spyOn(tSource, 'getCharacters');
  const tUseCase = new GetAllCharactersUseCase(tRepository)

  beforeEach(() => {
    mockGetCharacters.mockImplementation(fakeGetCharacter)
  })

  test('should throw error when send empty url', async () => {  
    await expect(() => tUseCase.handle('')).rejects.toThrow(TypeError)
  })

  test('should return entity', async () => {
    const result = await tUseCase.handle('https://rickandmortyapi.com/api/character')
    expect(result).toEqual({currentPage: 1, info: {}, results: [], searchText: null})
  })
})