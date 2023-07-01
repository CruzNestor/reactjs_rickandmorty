import { CharacterDataSourceImpl } from "../../../../../features/characters/data/datasources/CharacterDataSource"
import CharacterRepositoryImpl from "../../../../../features/characters/data/repositories/CharacterRepositoryImpl"
import { CharacterEntity } from "../../../../../features/characters/domain/entities/CharacterEntity"
import SearchCharacterUseCase from "../../../../../features/characters/domain/usecases/SearchCharacterUseCase"

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

describe('SearchCharacterUseCase', () => {
  const tSource = new CharacterDataSourceImpl()
  const tRepository = new CharacterRepositoryImpl(tSource)
  const mockSearchCharacters = jest.spyOn(tSource, 'searchCharacter');
  const tUseCase = new SearchCharacterUseCase(tRepository)

  beforeEach(() => {
    mockSearchCharacters.mockImplementation(fakeGetCharacter)
  })

  test('should throw error when send empty url', async () => {  
    await expect(() => tUseCase.handle('')).rejects.toThrow(TypeError)
  })

  test('should return entity', async () => {
    const result = await tUseCase.handle('https://rickandmortyapi.com/api/character/?name=rick')
    expect(result).toEqual({currentPage: 1, info: {}, results: [], searchText: null})
  })
})