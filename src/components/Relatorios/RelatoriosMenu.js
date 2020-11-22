import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const RelatoriosMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Abrir
      </Button>
      <Menu
        id="menu-relatorio"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Vendas</MenuItem>
        <MenuItem onClick={handleClose}>Satisfação</MenuItem>
        <MenuItem onClick={handleClose}>Estoque</MenuItem>
      </Menu>
    </>
  );
};

export default RelatoriosMenu
