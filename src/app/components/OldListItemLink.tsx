import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
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
  icon?: React.ReactElement;
  primary: string;
  to: string;
  onPressedItem?: () => void;
}

export default function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;
  return (
    <ListItem sx={{padding: '3px 10px'}}>
      <ListItemButton component={Link} to={to} sx={{borderRadius: '5px'}} onClick={props.onPressedItem}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItemButton>
    </ListItem>
  )
}