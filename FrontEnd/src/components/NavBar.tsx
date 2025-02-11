import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useAuth } from "../context/Auth/AuthContext";
import { Badge, Button, Grid } from "@mui/material";
import {useNavigate } from "react-router-dom";
import { ShoppingCart} from "@mui/icons-material";
import { useCart } from "../context/cart/CartContext";

function NavBar() {
  const { username, IsAuthenticated, logout } = useAuth();

  const { cartItems} = useCart();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navegate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMyOrder = ()=>{
    handleCloseUserMenu
    navegate("/my-orders");
    
  }

  const handleSideBarButton = () => {
    navegate("/login");
  };

  const handlelogoutSideBarButton = () => {
    logout();
    navegate("/");
    handleCloseUserMenu();
  };


  const handleCartTap = ()=>{
    navegate("/cart");
  }

  const handleLogo = () => {
    navegate("/");
  }


  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AdbIcon sx={{ display: "flex", mr: 1 }} />
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
                onClick={handleLogo}
              >
                GHub
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 0 }} display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"row"} gap={2}>
              <IconButton onClick={handleCartTap} aria-label="cart">
                <Badge badgeContent={cartItems.length} color="secondary">
                  <ShoppingCart sx={{color:"white"}} />
                </Badge>
              </IconButton>
              {IsAuthenticated ? (
                <>
                  <Tooltip title="Open settings">
                    <Grid
                      container
                      alignItems={"center"}
                      justifyContent={"center"}
                      gap={2}
                    >
                      <Grid>
                        <Typography>{username}</Typography>
                      </Grid>
                      <Grid>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                          <Avatar
                            alt={username || " "}
                            src="/static/images/avatar/2.jpg"
                          />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Tooltip>

                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleMyOrder}>
                      <Typography textAlign="center">My Orders</Typography>
                    </MenuItem>
                    <MenuItem onClick={handlelogoutSideBarButton}>
                      <Typography textAlign="center">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  onClick={handleSideBarButton}
                  variant="contained"
                  sx={{ color: "black", background: "white" }}
                >
                  Login
                </Button>
              )}
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
