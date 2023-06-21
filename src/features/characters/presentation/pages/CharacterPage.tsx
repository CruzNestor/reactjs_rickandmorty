import { useState } from "react";
import { Box, Button, Toolbar } from "@mui/material";
import { useAppDispatch } from "../../../../app/store/hooks";
import { searchCharacter } from '../redux/controllers/CharacterController';
import { CHARACTER_URL } from "../../../../app/constants/RickAndMortyUrls";
import InputSearch from "../../../../app/components/InputSearch";
import CharacterGrid from "../components/CharacterGrid";
import SearchCharacter from "../components/SearchCharacter";


export default function CharacterPage() {
  const [searchFocus, setSearchFocus] = useState(false);

  const dispatch = useAppDispatch()
  
  const onSearchFocus = () => {
    setSearchFocus(true);
  };

  const onSearchBlur = () => {
    setSearchFocus(false);
  };

  const onSearchSubmit = (text: string) => {
    let url = ''
    if(Number(text)){
      url = `${CHARACTER_URL}/${text}`
    } else {
      url = `${CHARACTER_URL}/?name=${text}`
    }
    dispatch(searchCharacter(url))
  }

  const onPressedIconSearch = (text: string) => {
    let url = ''
    if(Number(text)){
      url = `${CHARACTER_URL}/${text}`
    } else {
      url = `${CHARACTER_URL}/?name=${text}`
    }
    setSearchFocus(true);
    dispatch(searchCharacter(url))
  }

  return (
    <>
      {/* title */}
      <Toolbar>
        <h1>Characters</h1>
      </Toolbar>
      {/* End title */}

      {/* MainCard */}
      <Box
        sx={{
          backgroundColor: 'white',
          borderRadius: '10px',
          height: { xs: 'calc(100vh - 200px)', sm: 'calc(100vh - 190px)'},
          margin: { xs: '0', sm: '0 16px' }
        }}
      >
        <Toolbar>
          <InputSearch
            onFocus={onSearchFocus}
            onSubmit={onSearchSubmit}
            onPressedIconButton={onPressedIconSearch}
            placeholder='Search by name or id'
          />
          <Button
            color="error"
            onClick={onSearchBlur}
            sx={{ margin: '2px 0 0 8px', display: searchFocus ? 'inline' : 'none' }}
          >
            Cancel
          </Button>
        </Toolbar>

        {/* MainCard Content */}
        <Box sx={{ display: searchFocus ? 'none' : 'inline' }}>
          {CharacterGrid()}
        </Box>

        <Box sx={{ display: searchFocus ? 'inline' : 'none' }}>
          {SearchCharacter()}
        </Box>
        {/* End MainCard Content */}

      </Box>
      {/* End MainCard */}
    </>
  )
};
