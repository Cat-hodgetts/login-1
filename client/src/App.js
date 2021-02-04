import React, {useEffect, useState} from "react"; 
import './App.css';
import Axios from "axios";
import 'fontsource-roboto';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Grid, ButtonGroup, Card, Hidden } from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';







function App() {
 
  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const [usernameTextIDs, setUsernameTextIDs] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [passwordTextIDs, setPasswordTextIDs] = useState('');
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  



  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: usernameReg,
      password: passwordReg,
    }).then((response) => {
      console.log(response.data);
    });
  };

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message){
        setLoginStatus(response.data.message);
        setUsernameTextIDs("standard-error-helper-text");
        setPasswordTextIDs("standard-error-helper-text");
      } else {
        setLoginStatus(response.data[0].Username);
        setUsernameTextIDs("standard-basic");
        setPasswordTextIDs("standard-password-input");
      }
  });
  };

  useEffect(() =>{
    Axios.get("http://localhost:3001/login").then((response) => {
      if(response.data.loggedIn === true){
      setLoginStatus(response.data.user[0].Username);
      }
  })
  });




  return (

    <div className="App">

     <AppBar position="static">
        <Toolbar 
        style={{
          justifyContent: 'center',
          display: "inline-flex",
        }}
        >
          <Hidden xsDown>
      
          <ButtonGroup 
          color="inherit"
           variant="text" 
           aria-label="text primary button group">
          <Button>Home</Button>
          <Button>Cadets</Button>
          <Button>Stock Management</Button>
          <Button>Staff Accounts</Button>
          </ButtonGroup>
         
          <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>My Profile</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
              </Hidden>

             <Hidden smUp>
              <IconButton
                aria-label="more"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MenuIcon />Menu
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Home</MenuItem>
                <MenuItem onClick={handleClose}>Cadets</MenuItem>
                <MenuItem onClick={handleClose}>Stock Management</MenuItem>
                <MenuItem onClick={handleClose}>Staff Accounts</MenuItem>
              </Menu>
              </Hidden>
              
             
          
          
        </Toolbar>
      </AppBar>

      <Grid container
        direction="column"
        alignItems="center"
        spacing={1} 
      >

<Grid item xs={4}>
        <Card
        style={
          {
           justifyContent: 'center',
           display: 'inline-flex',
           maxWidth: '300px',
           minWidth: '190px',
           margin: 10,
          }
        } 
        >

      <div 
      className="registration"
      style={
        {

         margin: 10 ,
        }
      
      }
      >
        <h1>Registration</h1>
        <TextField id={usernameTextIDs} label="Username" 
        onChange={(e) =>{
          setUsernameReg(e.target.value);
        }}
         />
       <TextField
          id={passwordTextIDs}
          label="Password"
          type="password" 
        onChange={(e) => {
          setPasswordReg(e.target.value)
        }}
        />
      
        <Button 
        variant="contained" 
        color="primary" 
        style={
          {
           justifyContent: 'center',
           display: "inline-flex",
           margin: 12,}
        
        }
        onClick = {register}>Register</Button>
        </div>
        </Card>
        </Grid>

        <Grid item xs={4}>
        <Card
        style={
          {
           justifyContent: 'center',
           display: 'inline-flex',
           maxWidth: '300px',
           minWidth: '190px',
           margin: 10,
          }
        } 
        >

        <div 
        className="login" 
        style={
          {
           justifyContent: 'center',
           display: 'inline-block',
           margin: 12,}
        
        }>
          <h1>Login</h1>
          <TextField id={usernameTextIDs} label="Username" 
          onChange={(e) =>{
          setUsername(e.target.value);
        }}/>
        
        <TextField
          id={passwordTextIDs}
          label="Password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value)
          }}/>
        
          <Button 
          variant="contained" 
          color="primary" 
          style={
            {

             justifyContent: 'center',
             display: "inline-flex",
             margin: 12,}
          
          }
          onClick={login}>Login</Button>
      </div>
      </Card>
      </Grid>
      </Grid>


        <h1
        style={
          {color: 'white',}
        }
        >
          {loginStatus}
          </h1>
       
     </div>
     //</div>
  );
        }


export default App;
