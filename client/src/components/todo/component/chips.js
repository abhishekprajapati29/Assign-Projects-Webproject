import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import LabelIcon from "@material-ui/icons/Label";
import Tooltip from "@material-ui/core/Tooltip";
const options = ["Urgent", "Meeting", "School", "Games", "Project", "Now"];

const ITEM_HEIGHT = 48;

export default function Chips(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlechips = (data) => {
    setAnchorEl(null);
    props.handleChips(data);
  };

  return (
    <div>
      <Tooltip title="Labels">
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
          style={{ width: "fit-content", float: "right" }}
        >
          <LabelIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 200,
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === "Pyxis"}
            onClick={() => handlechips(option)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
