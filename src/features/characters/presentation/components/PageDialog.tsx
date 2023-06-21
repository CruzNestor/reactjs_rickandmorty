import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';

interface Props {
  onClose?: () => void,
  onSelectedPage?: (page: number) => void
  open: boolean,
  pages: number
}

export default function PageDialog(props: Props) {

  const onSelectedPage = (page: number) => {
    if(props.onSelectedPage !== undefined) props.onSelectedPage(page)
  }

  const createPageList = (total: number) => {
    let pageList = []
    for (let index = 1; index <= total; index++) {
      pageList.push(
        <ListItem key={`page${index}`} disablePadding>
          <ListItemButton onClick={() => onSelectedPage(index)}>
            <ListItemText primary={`Page ${index}`} sx={{ paddingLeft: '10px' }} />
          </ListItemButton>
        </ListItem>
      )
    }
    return <List>{pageList}</List>
  }

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Pages"}
        </DialogTitle>
        <DialogContent sx={{ padding: 0 }}>
          {createPageList(props.pages)}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}