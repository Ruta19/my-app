import React, { useState, useEffect, useContext } from "react";
import { AppBar, Select, MenuItem, Tabs, Tab } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import MyContext from "../Context/MyContext";

import Grid from "@mui/material/Grid";

function Nav() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [TenantListdata, setTenantListdata] = useState([]);
  const [active, setActive] = useState(0);

  const { selectedTenant, setSelectedTenant } = useContext(MyContext);
  console.log("CONTEXT", selectedTenant);

  const pages = [,"DataIntake", "DataValidation", "RuleProcessing", "ClearAlerts"];

  useEffect(() => {
    axios
      .get("http://localhost:3000/tenantList")
      .then((response) => {
        console.log("response", response);
        setTenantListdata(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  /*This function is for minimized view*/
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    console.log("iconval", event.currentTarget);
  };

  /*This function is for minimized view*/
  const handleCloseNavMenu = () => {
    setActive(1);
    setAnchorElNav(null);
  };

  const onChangeHandler = (event, value) => {
    console.log("value to be sent to filter", value, event.target.value);
    setSelectedTenant(event.target.value);
  };
  console.log("data", TenantListdata);

  const handleactive = (event, newValue) => {
    console.log("handleactive", event, newValue);
    setActive(newValue);
  };

  return (
    //main menu bar
    <AppBar position="static" sx={{ backgroundColor: "black" }} >
      {/* provides responsive width to hold content can be used instead of grid */}

      <Container maxWidth="xl">
        {/*Provides flex container*/}
        <Toolbar disableGutters>
          {/*Icons avail in MUI*/}
          {/* <DashboardIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />  */}
          {/*Displays DASHBOARD */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 6,
              display: { xs: "none", md: "flex" },

              fontWeight: "Bold",
              fontSize: "36",
              letterSpacing: ".rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            TENANT
          </Typography>

          <Select
           
            placeholder="Select Tenant"
            value={selectedTenant}
            onChange={onChangeHandler}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            style={{ backgroundColor: "white" }}
            sx={{ width: 180, height: 45 ,
              display: { xs: "none", md: "block" },
            }}
          >
            <MenuItem value="">Select Tenant</MenuItem>
            {TenantListdata.map((tenant) => (
              <MenuItem key={tenant.tenantId} value={tenant.tenantId}>
                {tenant.tenantName}
              </MenuItem>
            ))}
          </Select>

          {/*when we minimize this dropdown is showed*/}
          {/*In CSS, flex-grow is a property that specifies how much a flex item should grow relative to the other flex items in the same flex container when there is extra space available along the main axis. */}
          <Box sx={{  display: { xs: "flex", md: "none" },flexDirection:"row" }}>
            <Typography
              variant="h6"
              noWrap
              align="left"
              component="a"
              href="/"
              sx={{
                // mr: 6,
                display: { xs: "flex", md: "none" },
                 flexGrow:"1",
                fontWeight: "Bold",
                fontSize: "36",
                letterSpacing: ".rem",
                color: "inherit",
                textDecoration: "none",
                paddingTop:"10px"
              }}
            >
              TENANT
            </Typography>
   
            <IconButton
             // sx={{ ml: "10px" }}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Menu
              flexGrow="1"
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link
                      style={{ textDecoration: "none", color: "black" }}
                      to={`/${page}`}
                    >
                      {page}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
            <Select
           
           placeholder="Select Tenant"
           value={selectedTenant}
           onChange={onChangeHandler}
           displayEmpty
           inputProps={{ "aria-label": "Without label" }}
           style={{ backgroundColor: "white" }}
           sx={{ width: 180, height: 45 ,
             display: { xs: "block", md: "none" },
           }}
         >
           <MenuItem value="">Select Tenant</MenuItem>
           {TenantListdata.map((tenant) => (
             <MenuItem key={tenant.tenantId} value={tenant.tenantId}>
               {tenant.tenantName}
             </MenuItem>
           ))}
         </Select>
          </Box>
        

          {/* <DashboardIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />  */}

          {/*ended*/}

          {/*for FUll Screen*/}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Tabs
              value={active}
              onChange={handleactive}
              variant="scrollable"
              textColor="primary"
              indicatorColor="primary"
            >
              {pages.map((page, index) => (
                <Tab
                  key={page}
                  label={page}
                  sx={{
                    my: 2,
                    color: active === index ? "blue" : "inherit",
                    display: "block",
                  }}
                  component={Link}
                  to={`/${page}`}
                />
              ))}
            </Tabs>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Nav;
