import { FormControl, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useRef } from "react";


interface Props {
  onBlur?: () => void;
  onFocus?: () => void;
  onSubmit?: (text: string) => void;
  onPressedIconButton?: (text: string) => void;
  placeholder?: string;
}

export default function InputSearch(props: Props) {

  const textRef = useRef<HTMLInputElement>();

  const onKeyDown = (event: any) => {
    if(event.key === 'Enter') {
      if(props.onSubmit !== undefined) {
        props.onSubmit(event.target.value)
      }
    }
  }

  const onPressedIconButton = () => {
    if(textRef.current !== undefined && textRef.current.value !== '') {
      if(props.onPressedIconButton !== undefined) props.onPressedIconButton(textRef.current.value)
    }    
  }

  return (
    <FormControl 
      size="small" 
      variant="outlined"
      sx={{width: {xs: '220px', sm: '270px'}}}
    >
      <OutlinedInput
        inputRef={textRef}
        id="outlined-search-input"
        placeholder={props.placeholder}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
        onKeyDown={(event) => onKeyDown(event)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton edge="end" onClick={onPressedIconButton}>
              {<SearchIcon />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}