import { useEffect, useState } from "react";
import { Box, CircularProgress, Grid, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../app/store/hooks";
import { CharacterEntity } from "../../domain/entities/CharacterEntity";
import { searchCharacter } from '../redux/controllers/CharacterController';
import { CHARACTER_URL } from "../../../../app/constants/RickAndMortyUrls";
import CharacterCard from "./CharacterCard";
import Pagination from "./Pagination";
import PageDialog from "./PageDialog";


export default function SearchCharacter() {
  const state = useAppSelector(state => state.searchCharacter)
  const theme = useTheme()

  const [openDialog, setOpenDialog] = useState(false);
  const [dynamicComponent, setDynamicComponent] = useState(<></>);

  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if(state.loading){
      setDynamicComponent(buildLoading()) 
    } else if(state.error){
      setDynamicComponent(buildError(state.error))
    } else if(state.data){
      setDynamicComponent(buildGrid(state.data))
    }
  }, [state])

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
        <div>{message}</div>
      </Box>
    )
  }

  const getPage = (url: string) => {
    dispatch(searchCharacter(url))
  }

  const onPressedPageButton = () => {
    setOpenDialog(true);
  };

  const onSelectedPage = (page: number) => {
    setOpenDialog(false);
    getPage(`${CHARACTER_URL}/?page=${page}&name=${state.data?.searchText}`)
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
          <Pagination
            page={data.currentPage}
            show={20}
            dataLength={data.results.length}
            total={data.info.count}
            onPressedPageButton={onPressedPageButton}
            onPressedFirstPageButton={() => getPage(`${CHARACTER_URL}/?page=1&name=${data.searchText}`)}
            onPressedLastPageButton={() => getPage(`${CHARACTER_URL}/?page=${data.info.pages}&name=${data.searchText}`)}
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

  const buildGrid = (data: CharacterEntity) => {
    return(
      <Grid container spacing={2} sx={{ padding: '16px' }}>
        {data.results.map((element) => {
          return (
            <Grid key={element['id']} item xs={12} sm={6} md={3}>
              <CharacterCard data={element} />
            </Grid>
          )
        })}
      </Grid>
    )
  }

  return (
    <>
    <Box sx={{height: {xs: 'calc(100vh - 340px)', sm: 'calc(100vh - 300px)'}, overflowY: 'auto'}}>
      {dynamicComponent}
    </Box>
    {buildPagination()}
    {buildPageDialog()}
    </> 
  )
}