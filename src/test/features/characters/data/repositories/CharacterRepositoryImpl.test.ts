import CharacterRepositoryImpl from "../../../../../features/characters/data/repositories/CharacterRepositoryImpl"
import { CharacterDataSourceImpl } from "../../../../../features/characters/data/datasources/CharacterDataSource"
import { CharacterEntity } from "../../../../../features/characters/domain/entities/CharacterEntity";

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

const fakeSearchCharacter = async (url: string) : Promise<CharacterEntity> => {
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

describe('CharacterRepositoryImpl', () => {

  const source = new CharacterDataSourceImpl()
  const mockGetCharacters = jest.spyOn(source, 'getCharacters');
  const mockSearchCharacter = jest.spyOn(source, 'searchCharacter');
  const repository = new CharacterRepositoryImpl(source)

  beforeEach(() => {
    mockGetCharacters.mockImplementation(fakeGetCharacter)
    mockSearchCharacter.mockImplementation(fakeSearchCharacter)
  })

  describe('getCharacter', () => {
    test('should throw error when send empty url', async () => {  
      await expect(() => repository.getCharacters('')).rejects.toThrow(TypeError)
    })
  
    test('should return valid object', async () => {  
      const result = await repository.getCharacters('https://example.com')
      expect(result).toEqual({currentPage: 1, info: {}, results: [], searchText: null})
    })
  })

  describe('searchCharacter', () => {
    test('should throw error when send empty url', async () => {  
      await expect(() => repository.searchCharacter('')).rejects.toThrow(TypeError)
    })
  
    test('should return valid object', async () => {  
      const result = await repository.searchCharacter('https://example.com')
      expect(result).toEqual({currentPage: 1, info: {}, results: [], searchText: null})
    })
  })

})