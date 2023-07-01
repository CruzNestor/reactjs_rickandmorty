import { CharacterDataSourceImpl } from "../../../../../features/characters/data/datasources/CharacterDataSource"


describe('CharacterDataSource', () => {
  jest.setTimeout(15000)
  const source = new CharacterDataSourceImpl()

  describe('getCharacters', () => {
    test('should return a character entity', async () => {
      const result = await source.getCharacters('https://rickandmortyapi.com/api/character')
      expect(result.results.length).toBe(20)
    })
  })

  describe('searchCharacters', () => {
    test('should return a character entity', async () => {
      const tSearchText = 'rick'
      const result = await source.searchCharacter(`https://rickandmortyapi.com/api/character/?name=${tSearchText}`)
      expect(result.searchText).toBe(tSearchText)
    })
  })

  describe('getFirstSeenIn', () => {
    test('should return a string', async () => {
      const result = await source.getFirstSeenIn(`https://rickandmortyapi.com/api/episode/1`)
      expect(typeof result).toBe('string')
    })
  })
  
})