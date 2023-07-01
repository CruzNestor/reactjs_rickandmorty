import { useCallback, useEffect, useState } from "react";
import { Box, CircularProgress, Grid, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks"
import { getCharacters } from '../redux/controllers/CharacterController';
import { CHARACTER_URL } from "../../../../app/constants/RickAndMortyUrls";
import { CharacterEntity } from "../../domain/entities/CharacterEntity";
import CharacterPagination from "./Pagination";
import PageDialog from "./PageDialog";
import CharacterCard from "./CharacterCard";


export default function CharacterGrid() {
  const state = useAppSelector(state => state.character)
  const theme = useTheme()

  const [openDialog, setOpenDialog] = useState(false);
  const [dynamicComponent, setDynamicComponent] = useState(<></>);
  
  const dispatch = useAppDispatch();

  const buildLoading = () => {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: 'calc(100vh - 310px)' }}
      >
        <CircularProgress />
      </Box>
    )
  }

  const buildError = (message: string) => {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ height: 'calc(100vh - 310px)' }}
      >
        <div>Error: {message}</div>
      </Box>
    )
  }

  const buildData = useCallback((data: CharacterEntity) => {
    return (
      <Grid 
        container 
        spacing={2} 
        sx={{ padding: '16px' }} 
      >
        {data.results.map((element, index) => {
          return (
            <Grid key={index} item xs={6} sm={6} md={3}>
              <CharacterCard data={element}/>
            </Grid>
          )
        })}
      </Grid>
    )
  }, [])

  useEffect(() => {
    if(state.data === null){
      dispatch(getCharacters(CHARACTER_URL))
    } else if(state.loading) {
      setDynamicComponent(buildLoading())
    } else if(state.error){
      setDynamicComponent(buildError(state.error))
    } else {
      setDynamicComponent(buildData(state.data))
    }
  }, [dispatch, buildData, state])

  const getPage = (url: string) => {
    dispatch(getCharacters(url))
  }

  const onPressedPageButton = () => {
    setOpenDialog(true);
  };

  const onSelectedPage = (page: number) => {
    setOpenDialog(false);
    getPage(`${CHARACTER_URL}/?page=${page}`)
  }

  const onClosePageDialog = () => {
    setOpenDialog(false);
  };

  const buildPagination = () => {
    if(state.data){
      const data = state.data
      return (
        <Box
          sx={{ borderTop: `1px solid ${theme.palette.divider}` }}>
          <CharacterPagination
            page={data.currentPage}
            dataLength={data.results.length}
            show={20}
            total={data.info.count}
            onPressedPageButton={onPressedPageButton}
            onPressedFirstPageButton={() => getPage(CHARACTER_URL)}
            onPressedLastPageButton={() => getPage(`${CHARACTER_URL}/?page=${data.info.pages}`)}
            onPressedNextPageButton={() => getPage(data.info.next)}
            onPressedPreviousPageButton={() => getPage(data.info.prev)}
            disableFirstPageButton={data.info.prev === null ? true : false}
            disableLastPageButton={data.info.next === null ? true : false}
            disableNextPageButton={data.info.next === null ? true : false}
            disablePreviousPageButton={data.info.prev === null ? true : false}
          />
        </Box>
      )
    }
    return null
  }

  const buildPageDialog = () => {
    if(state.data){
      return (
        <PageDialog
          pages={state.data.info.pages}
          open={openDialog}
          onClose={onClosePageDialog}
          onSelectedPage={onSelectedPage}
        />
      )
    }
    return null
  }

  return(
    <>
      {/* MainCard Content */}
      <Box sx={{height: {xs: 'calc(100vh - 340px)', sm: 'calc(100vh - 300px)'}, overflowY: 'auto'}}>
        {dynamicComponent}
      </Box>
      {buildPagination()}
      {buildPageDialog()}
      {/* End MainCard Content */}
    </>
  )
};