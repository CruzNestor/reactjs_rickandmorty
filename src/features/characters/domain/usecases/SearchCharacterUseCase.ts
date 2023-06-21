import { CharacterEntity } from "../entities/CharacterEntity";
import CharacterRepository from "../repositories/CharacterRepository";

export default class SearchCharacterUseCase {
  repository: CharacterRepository;
  
  constructor(repository: CharacterRepository){
    this.repository = repository
  }

  async handle(text: string): Promise<CharacterEntity>{
    return this.repository.searchCharacter(text)
  }
}