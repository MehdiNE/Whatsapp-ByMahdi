import React, { useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import {
  Add,
  ExitToApp,
  Home,
  Message,
  PeopleAlt,
  SearchOutlined,
} from "@material-ui/icons";
import { auth, createTimestamp, db } from "../firebase";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import SidebarList from "./SidebarList";
import useRooms from "../hooks/useRooms";
import useUsers from "../hooks/useUsers";
import useChats from "../hooks/useChats";

export default function Sidebar({ user, page }) {
  const rooms = useRooms();
  const users = useUsers(user);
  const chats = useChats(user);

  const [searchResults, setSearchResult] = useState([]);
  const [menu, setMenu] = useState(1);

  const signOut = () => {
    auth.signOut();
  };

  const createRoom = () => {
    const roomName = prompt("Type the name of your room");

    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
        timestamp: createTimestamp(),
      });
    }
  };

  async function searchUsersAndRooms(event) {
    event.preventDefault();
    const query = event.target.elements.search.value;
    const userSnapshot = await db
      .collection("users")
      .where("name", "==", query)
      .get();
    const roomSnapshot = await db
      .collection("rooms")
      .where("name", "==", query)
      .get();
    const userResult = userSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const roomResult = roomSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    const searchResults = [...userResult, ...roomResult];
    setMenu(4);
    setSearchResult(searchResults);
  }

  let Nav;
  if (page.isMobile) {
    Nav = NavLink;
  } else {
    Nav = (props) => (
      <div
        className={`${props.activeClass ? "sidebar__menu--selected" : ""}`}
        onClick={props.onClick}
      >
        {props.children}
      </div>
    );
  }

  return (
    <div
      className="sidebar"
      style={{
        minHeight: page.isMobile ? page.height : "auto",
      }}
    >
      <div className="sidebar__header">
        <div className="sidebar__header--left">
          <Avatar src={user?.photoURL} />
          <h4>{user?.displayName}</h4>
        </div>
        <div className="sidebar__header--right">
          <IconButton onClick={signOut} style={{ color: "white" }}>
            <ExitToApp />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <form
          onSubmit={searchUsersAndRooms}
          className="sidebar__search--container"
        >
          <SearchOutlined />
          <input
            placeholder="Search for users or rooms"
            type="text"
            id="search"
          />
        </form>
      </div>

      <div className="sidebar__menu" style={{ color: "white" }}>
        <Nav
          to="/chats"
          activeClassName="sidebar__menu--selected"
          onClick={() => setMenu(1)}
          activeClass={menu === 1}
        >
          <div className="sidebar__menu--home" style={{ color: "white" }}>
            <Home color="inherit" />
            <div className="sidebar__menu--line" />
          </div>
        </Nav>
        <Nav
          to="/rooms"
          activeClassName="sidebar__menu--selected"
          onClick={() => setMenu(2)}
          activeClass={menu === 2}
        >
          <div className="sidebar__menu--rooms">
            <Message />
            <div className="sidebar__menu--line" />
          </div>
        </Nav>
        <Nav
          to="/users"
          activeClassName="sidebar__menu--selected"
          onClick={() => setMenu(3)}
          activeClass={menu === 3}
        >
          <div className="sidebar__menu--users">
            <PeopleAlt />
            <div className="sidebar__menu--line" />
          </div>
        </Nav>
      </div>

      {page.isMobile ? (
        <Switch>
          <Route path="/chats">
            <SidebarList title="Chats" data={chats} />
          </Route>
          <Route path="/rooms">
            <SidebarList title="Rooms" data={rooms} />
          </Route>
          <Route path="/users">
            <SidebarList title="Users" data={users} />
          </Route>
          <Route path="/search">
            <SidebarList title="Search Result" data={searchResults} />
          </Route>
        </Switch>
      ) : menu === 1 ? (
        <SidebarList title="Chats" data={chats} />
      ) : menu === 2 ? (
        <SidebarList title="Rooms" data={rooms} />
      ) : menu === 3 ? (
        <SidebarList title="Users" data={users} />
      ) : menu === 4 ? (
        <SidebarList title="Search Result" data={searchResults} />
      ) : null}

      <div className="sidebar__chat--addRoom">
        <IconButton onClick={createRoom}>
          <Add />
        </IconButton>
      </div>
    </div>
  );
}
