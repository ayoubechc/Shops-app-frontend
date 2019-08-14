import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import SignUp from "./SignUp";
import Shops from "./Shops";
import axios from 'axios';

class SignIn extends Component {
    state={
        SignUp:false,
        SignIn:true,
        errors:{},
        email:'',
        password:'',
        is_login:false,
        username:'',
        err:''
    }
    componentWillMount() {
        this.refreshList();   
    }
    refreshList = () => {
    var config = {
        headers: {'Authorization':'Token' +' '+localStorage.getItem('token')},
        }
        axios.get('http://127.0.0.1:8000/api/is_login/',config)
            .then(res => {this.setState({is_login:res.data.is_login,username:res.data.email,SignIn:res.data.SignIn})}) 
    
    }
    onChangeInput = (e) =>{
        const name = e.target.name;
        let value ='';
        value = e.target.value;
        this.setState({
            [name]: value,errors:{ [name]:''}
        });
    }
    SignUp=()=>{
        this.setState({
            SignUp:true,SignIn:false
        })
    }
    login =(e)=> {
        e.preventDefault(); 
        var bodyFormData = new FormData();  
        if(this.state.email===''){
            this.setState({
                errors:{email:'the email is required'}
            })
            return;
        }
        if(this.state.password===''){
            this.setState({
                errors:{password:'the password is required'}
            })
            return;
        }
        bodyFormData.set('email', this.state.email);
        bodyFormData.set('password', this.state.password);
        axios.post('http://127.0.0.1:8000/api/SignIn/',bodyFormData)
             .then(response=>{localStorage.setItem('token',response.data.token);this.setState({is_login:response.data.is_login,SignIn:response.data.SignIn})})
             
             
    }
    log_out=()=>{
        this.setState({
            SignIn:true,is_login:false
        })
    }
  render() {
    const {email,password,errors} = this.state;
    return (
        <div>
        {this.state.SignIn ?(
        <div class="container" style={{width:'40%',marginTop:'120px'}}>
            <div class="card">
                <article class="card-body">
                    <a onClick={this.SignUp} class="float-right btn btn-outline-primary">Sign up</a>
                    <h4 class="card-title mb-4 mt-1">Sign in</h4>
                    <form>
                        <div class="form-group">
                            <label>Your email</label>
                            <input class="form-control" placeholder="Email" type="email"  name="email"
                                   defaultValue={email} onChange={this.onChangeInput}/>
                        </div> 
                        <div style={{color:'red'}} >{errors.email}</div>
                        <div class="form-group">
                            <label>Your password</label>
                            <input class="form-control" placeholder="******" type="password" name="password"
                                   defaultValue={password} onChange={this.onChangeInput}/>
                        </div> 
                        <div style={{color:'red'}} >{errors.password}</div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary btn-block" onClick={this.login}> Login  </button>
                        </div>                                                  
                    </form>
                </article>
            </div> 
        </div>    
        ):null}
        {this.state.SignUp?(
            <SignUp/>
        ):null}   
        {this.state.is_login?(
            <Shops username={this.state.username} log_out={this.log_out} refreshList={this.refreshList} />
        ):null}    
        </div>
    )
  }
}
export default SignIn;