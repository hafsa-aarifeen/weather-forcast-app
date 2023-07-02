import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Display from "../Display";

const MenuExampleSecondaryPointing = () => {
  const [state, setState] = useState({ activeItem: "dashboard" });

  const handleItemClick = (e, { name }) => setState({ activeItem: name });

  const handleHomeClick = (e, { name }) => {
    setState({ activeItem: name });
  };

  return (
    <div>
      <Menu pointing secondary>
        <Link to="/dashboard">
          <Menu.Item
            name="dashboard"
            active={state.activeItem === "dashboard"}
            onClick={handleHomeClick}
          />
        </Link>
        <Menu.Menu position="right">
          <Link to="/">
            <Menu.Item
              name="logout"
              active={state.activeItem === "logout"}
              onClick={handleItemClick}
            />
          </Link>
        </Menu.Menu>
      </Menu>
      {state.activeItem === "dashboard" && <Display />}
    </div>
  );
};

export default MenuExampleSecondaryPointing;
