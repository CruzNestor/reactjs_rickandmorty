import { Box, Button, IconButton } from '@mui/material'
import IconChevronRight from '@mui/icons-material/ChevronRightRounded'
import IconChevronLeft from '@mui/icons-material/ChevronLeftRounded'

interface Props {
  onPressedPageButton?: () => void,
  onPressedFirstPageButton?: () => void,
  onPressedLastPageButton?: () => void,
  onPressedNextPageButton?: () => void,
  onPressedPreviousPageButton?: () => void,
  disableFirstPageButton?: boolean,
  disableLastPageButton?: boolean,
  disableNextPageButton?: boolean,
  disablePreviousPageButton?: boolean,
  page: number,
  show: number,
  dataLength: number,
  total: number
}

export default function CharacterPagination(props: Props) {

  const { page, show, total } = props
  
  let length = props.dataLength;
  if (length < show){
    length = show;
  }
  const start = ((page - 1) * length) + 1;
  const end = (page* length) <= total ? page * length : total
  
  return (
    <Box sx={{display: {xs: 'block', sm: 'flex'}}}>
      <Box sx={{ padding: {xs: '3px 16px', sm: '8px 6px 5px 16px'} }}>
        <span>{`Showing ${start} - ${end} of ${total}`}</span>
      </Box>
      <Box sx={{ marginLeft: 'auto',  padding: {xs: '3px 8px', sm: '5px 6px'} }}>
        <Button
          variant="outlined"
          onClick={props.onPressedPageButton}
          size='small'
          sx={{ margin: { xs: '0 0 0 5px', sm: '0 6px' } }}
          aria-label='button-pages'
        >
          Page: {page}
        </Button>
        <Button
          onClick={props.onPressedFirstPageButton}
          size='small'
          sx={{ margin: { xs: '0', sm: '0 6px' } }}
          disabled={props.disableFirstPageButton}
          aria-label='button-first'
        >
          First
        </Button>
        <IconButton
          color="primary"
          size='small'
          onClick={props.onPressedPreviousPageButton}
          sx={{ margin: { xs: '0', sm: '0 6px' } }}
          disabled={props.disablePreviousPageButton}
          aria-label='button-previous'
        >
          <IconChevronLeft />
        </IconButton>
        <IconButton
          color="primary"
          onClick={props.onPressedNextPageButton}
          size='small'
          sx={{ margin: { xs: '0', sm: '0 6px' } }}
          disabled={props.disableNextPageButton}
          aria-label='button-next'
        >
          <IconChevronRight />
        </IconButton>
        <Button
          onClick={props.onPressedLastPageButton}
          size='small'
          sx={{ margin: { xs: '0', sm: '0 6px' } }}
          disabled={props.disableLastPageButton}
          aria-label='button-last'
        >
          Last
        </Button>
      </Box>
    </Box>
    
  )
}