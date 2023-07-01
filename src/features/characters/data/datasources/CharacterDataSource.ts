import axios from 'axios';
import { CharacterEntity } from "../../domain/entities/CharacterEntity";
import { AxiosException } from '../../../../app/errors/exceptions';
import { getNumberPageFromUrl, getSearchTextFromUrl } from '../../../../app/utils/PathManager';


export interface CharacterDataSource {
  getCharacters(url: string): Promise<CharacterEntity>
  searchCharacter(url: string): Promise<CharacterEntity>
}

export class CharacterDataSourceImpl implements CharacterDataSource {
  
  async getCharacters(url: string): Promise<CharacterEntity> {
    return await axios.get(
      url
    ).then(async (response) => {
      const currentPage =  getNumberPageFromUrl(url)
      for (const [index, element] of response.data.results.entries()) {
        const firstSeen = await this.getFirstSeenIn(element['episode'][0])
        response.data.results[index]['first_seen'] = firstSeen
      }
      const data: CharacterEntity = {
        currentPage: currentPage,
        info: response.data.info,
        results: response.data.results,
        searchText: null
      }
      return data
    }).catch(error => {
      throw new Error(AxiosException(error))
    })
  }

  async searchCharacter(url: string): Promise<CharacterEntity> {
    return await axios.get(
      url
    ).then(async (response) => {
      const currentPage = getNumberPageFromUrl(url)
      const searchText = getSearchTextFromUrl(url)

      let info = {count: 1, next: null, pages: 1, prev: null}
      let results = []

      if(response.data.info !== undefined) {
        info = response.data.info
      }

      if(response.data.results !== undefined) {
        for (const [index, element] of response.data.results.entries()) {
          const firstSeen = await this.getFirstSeenIn(element['episode'][0])
          response.data.results[index]['first_seen'] = firstSeen
        }
        results = response.data.results
      } else {
        const firstSeen = await this.getFirstSeenIn(response.data['episode'][0])
        response.data['first_seen'] = firstSeen
        results.push(response.data)
      }

      return {currentPage: currentPage, info: info, results: results, searchText: searchText}

    }).catch(error => {
      throw new Error(AxiosException(error))
    })
  }

  async getFirstSeenIn(url: string): Promise<string> {
    return await axios.get(url)
    .then(response => {
      const result : string = response.data['name']
      return result
    })
  }
}

