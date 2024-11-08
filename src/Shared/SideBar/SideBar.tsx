/** @format */

import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Modal } from "react-bootstrap";
import ChangePassword from "../../Components/ChangePassword/ChangePassword";
import { AuthContext } from "../../Context/AuthContext";

export default function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);    // to open and close modal
  const handleShow = () => setShow(true);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  }; // sidebarCollapsing

  const nav = useNavigate();

  const { userRole }: any = useContext(AuthContext)

  function logout() {
    if (localStorage.getItem("userTkn") !== null) {
      localStorage.removeItem("userTkn");

      nav("/login");
    }
  }

  return (


    <>
      {/* {console.log(userRole)
      } */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Body> <ChangePassword /> </Modal.Body>
      </Modal>

      <div className="side-bar">
        <Sidebar
          collapsed={isCollapsed}
          backgroundColor="#0E382F"
          className="vh-100 text-white"
        >
          <Menu className="" >
            <MenuItem
              onClick={handleToggle}
              className="mt-5 text-center pt-4"
              icon={isCollapsed ? <i className="fa fa-arrow-right d-block" ></i>
                : <i className="fa fa-arrow-left d-block" ></i>}
            >
            </MenuItem>
            <MenuItem
              title="dashboard"
              icon={<i className="fa fa-home"></i>}
              component={<Link to="/dashboard" />}
            >
              {" "}
              Home
            </MenuItem>
            {userRole == 'Manager' ? <MenuItem
              title="users list"
              icon={<i className="fa fa-users"></i>}
              component={<Link to="/dashboard/users" />}
            >
              Users

            </MenuItem> : ''}

            <MenuItem
              title="recipes"
              icon={<i className="fa-solid fa-sheet-plastic"></i>}
              component={<Link to="/dashboard/projects" />}
            >
              Projects
            </MenuItem>
            <MenuItem
              title="categories"
              icon={<i className="fa-solid fa-list-check"></i>}
              component={<Link to="/dashboard/tasks" />}
            >
              Tasks
            </MenuItem>
            <MenuItem
              title="change Password"
              icon={<i className="fa-solid fa-unlock"></i>}
              onClick={handleShow} >
              Change Password
            </MenuItem>
            <MenuItem
              title="logout"
              onClick={logout}
              icon={<i className="fa-solid fa-right-from-bracket"></i>}
            >
              Logout
            </MenuItem>
          </Menu>
        </Sidebar>
      </div>

    </>


  );
}
