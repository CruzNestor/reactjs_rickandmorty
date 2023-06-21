import { CharacterEntity } from "../entities/CharacterEntity";
import CharacterRepository from "../repositories/CharacterRepository";

export default class GetAllCharactersUseCase {
  repository: CharacterRepository;
  
  constructor(repository: CharacterRepository){
    this.repository = repository
  }

  async handle(url: string): Promise<CharacterEntity>{
    return this.repository.getCharacters(url)
  }
}