import { Icon, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { forwardRef } from "react";
import { NavLink, LinkProps  } from "react-router-dom";

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(itemProps, ref) {
  return (
    <NavLink
      ref={ref}
      {...itemProps}
      role={undefined}
      style={{ color: "black" }}
      className={({ isActive }) => (isActive ? itemProps.className + ' Mui-selected' : itemProps.className)}
    />
  )
});

interface ListItemLinkProps {
  icon?: string;
  open: boolean;
  primary: string;
  to: string;
  onPressedItem?: () => void;
}

export default function ListItemLink(props: ListItemLinkProps) {
  const { icon, open, primary, to } = props;
  return (
    <ListItem sx={{display: 'block', padding: '3px 10px'}}>
      <ListItemButton 
        component={Link} 
        to={to} 
        onClick={props.onPressedItem}
        sx={{
          borderRadius: '5px',
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
      >
        {icon 
          ? <ListItemIcon 
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <Icon>{icon}</Icon>
            </ListItemIcon> 
          : null
        }
        <ListItemText primary={primary} sx={{ opacity: open ? 1 : 0  }}  />
      </ListItemButton>
    </ListItem>
  )
}