import { configureStore } from '@reduxjs/toolkit'
import CharacterReducer  from '../../features/characters/presentation/redux/reducers/CharacterReducer'
import SearchCharacterReducer  from '../../features/characters/presentation/redux/reducers/SearchCharacterReducer'

export const store = configureStore({
  reducer: {
    character: CharacterReducer,
    searchCharacter: SearchCharacterReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch