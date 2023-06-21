export type CharacterEntity = {
  currentPage: number,
  info: {[key: string]: any},
  results: Record<string, any>[],
  searchText: string | null
}