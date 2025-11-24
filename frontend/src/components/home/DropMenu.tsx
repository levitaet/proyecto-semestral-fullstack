import { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface DropMenuProps {
  title: string;
  items: string[];
  onSelect: (item: string) => void;
}

const DropMenu = ({ title, items, onSelect }: DropMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (item: string) => {
    onSelect(item);
    handleClose();
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClick}
        endIcon={<ArrowDropDownIcon />}
      >
        {title}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {items.map((item) => (
          <MenuItem key={item} onClick={() => handleSelect(item)}>
            {item}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DropMenu;