import { CharacterEntity } from "../entities/CharacterEntity";

export default interface CharacterRepository {
  getCharacters(url: string): Promise<CharacterEntity>;
  searchCharacter(url: string) : Promise<CharacterEntity>;
}