import { getNumberPageFromUrl, getSearchTextFromUrl } from "../../../app/utils/PathManager"

describe('PathManager', () => {

  describe('getNumberPageFromUrl', () => {
    test('should return a number', () => {
      const result = getNumberPageFromUrl('http://example.com/api/character/5')
      expect(typeof result).toBe('number')
    })

    test('should return the page 1', () => {
      const result = getNumberPageFromUrl('http://example.com/api/character/?page=1')
      expect(result).toBe(1)
    })
  })

  describe('getSearchTextFromUrl', () => {
    test('should return a empty string', () => {
      const result = getSearchTextFromUrl('http://example.com/api/character/?page=1')
      expect(result).toBe('')
    })

    test('should return search text', () => {
      const result = getSearchTextFromUrl('http://example.com/character/?name=rick')
      expect(result).toBe('rick')
    })
  })
  
})