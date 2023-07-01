import { CharacterEntity } from "../../domain/entities/CharacterEntity";
import { CharacterDataSource } from "../datasources/CharacterDataSource";
import CharacterRepository  from "../../domain/repositories/CharacterRepository";


export default class CharacterRepositoryImpl implements CharacterRepository {
  
  private readonly source: CharacterDataSource;

  constructor(source: CharacterDataSource) {
    this.source = source;
  }

  async getCharacters(url: string): Promise<CharacterEntity> {
    return await this.source.getCharacters(url)
  }

  async searchCharacter(url: string): Promise<CharacterEntity> {
    return await this.source.searchCharacter(url)
  }
}