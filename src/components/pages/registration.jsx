/***************************************************************
 * @purpose  : Define Registration Function 
 * @file     : registration.jsx              
 * @overview : Component To User Registrtaion 
 * @author   : priti shinde
 * @since    : 1/6/2020
***************************************************************/

import React from 'react'
import "../../scss/registration.scss"
import Link from '@material-ui/core/Link';
import {emailValidate , passwordValiadate } from '../../services/validation'
import Button from '@material-ui/core/Button';
import { Card, TextField ,Snackbar,IconButton ,InputAdornment,Input,FormControl,InputLabel} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import users from '../../services/user'
const service = new users()

class Registration extends React.Component{
    constructor(){
        super()
            this.state={
                firstName:'',
                lastName:'',
                email:'',
                password:'',
                service:"advance",
                snackbaropen:false,
                snackbarmsg:"",
                showPassword:false,
                
            } 
    }
    
    snackbarClose = ()=>{
        this.setState({snackbaropen:false})
    }

    handleChange=(event)=>{
        this.setState({[event.target.name]: event.target.value});
    }

    handleLogin=()=>{
        this.props.history.push('/login')
    }
    
    handleClickShowPassword = () => {
        this.setState({showPassword:!this.state.showPassword});
      };
    
    handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    handleClick=()=>{
        var user={
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            email:this.state.email,
            password:this.state.password,
            service:"advance",
             
        }
        console.log("componet",user)
        service.register(user)
            .then((response)=>{
                console.log(response)
                this.setState({snackbaropen:true,snackbarmsg:"Registartion Successfull"})
               
            })
            .catch(error=>{
                console.log(error)
                    this.setState({snackbaropen:true,snackbarmsg:error.message})
            }) 
    }

    validate(){
        if(emailValidate(this.state.email) && passwordValiadate(this.state.password)
          && passwordValiadate(this.state.confirmPassword))
                alert('email or password incorrect')
           
                    
    }

    render(){
        this.validate()
        return (
            <div className="container"> 
            <Snackbar
                anchorOrigin={{vertical:'center',horizontal:'center'}}
                open={this.state.snackbaropen}
                autoHideDuration={4000}
                onClose={this.snackbarClose}

                message={<span id="message-id">{this.state.snackbarmsg}</span>}
                action={[<IconButton key="close" arial-label="close" color="inherit" onClick={this.snackbarClose}>
                    x
                </IconButton>]}
            />
                
                  
                <Card className="registerCard">
                    <div className="register-header">
                      Registration      
                    </div>
                    <div className="input-container">
                        <TextField name="firstName" id="firstName" type="text" label="First Name" value={this.state.firstName}  onChange={this.handleChange} required />
                        <TextField name="lastName" id="lastName" type="text" label="Last Name" value={this.state.lastName}  onChange={this.handleChange} required />
                        <TextField name="email" id="email" type="text" label="Email" value={this.state.email}  onChange={this.handleChange} required />                        
                        <FormControl>
                            <InputLabel>Password</InputLabel>
                            <Input name="password"id="password" type={this.state.showPassword ? 'text' : 'password'} value={this.state.password}  helperText="Minimum 8 character" onChange={this.handleChange} required
                                endAdornment={ <InputAdornment position="end">
                                    <IconButton aria-label="password visibility"  onClick={this.handleClickShowPassword} onMouseDown={this.handleMouseDownPassword}>
                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}</IconButton>
                                </InputAdornment>
                                }
                            />
                        </FormControl>
                    </div>
                    <div className="flex-container-row full-width">
                        <div className="div-display">
                            <Link component="button" variant="body2" onClick={this.handleLogin}  className="div-display">Login</Link>
                        </div>
                        <div className="div-display">                        
                            <Button variant="outlined" color="primary" onClick={this.handleClick}>Register</Button>
                        </div>
                    </div >  

                </Card> 
            </div>          
          );
    }

}

export default Registration


