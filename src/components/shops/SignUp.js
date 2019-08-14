import React, { Component } from 'react'
import SignIn from "./SignIn";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

class SignUp extends Component {
    state={
        SignUp:true,
        SignIn:false,
        errors:{},
        email:'',
        password:''
    }
    SignIn=()=>{
        this.setState({
            SignUp:false,SignIn:true
        })
    }
    onChangeInput = (e) =>{
        const name = e.target.name;
        let value ='';
        value = e.target.value;
        this.setState({
            [name]: value,errors:{ [name]:''}
        });
    }
    register=(e)=>{
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
        let lastAtPos = this.state.email.lastIndexOf('@');
        let lastDotPos = this.state.email.lastIndexOf('.');

        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') == -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
            this.setState({
                errors:{email_valid:'the email is invalid'}
            })
            return;
        }
 
        bodyFormData.set('email', this.state.email);
        bodyFormData.set('password', this.state.password);
        axios.post('http://127.0.0.1:8000/api/SignUp/',bodyFormData)
             .then(alert(" sucsseful!!! go to login"))
    }
  render() {
    const {email,password,errors} = this.state;
    return (
        <div>
        {this.state.SignUp?(
        <div class="container"  style={{width:'40%',marginTop:'120px'}}>
            <div class="card">
                <article class="card-body">
                    <a onClick={this.SignIn} class="float-right btn btn-outline-primary">Sign in</a>
                    <h4 class="card-title mb-4 mt-1">Sign up</h4>
                    <form>
                        <div class="form-group">
                            <label>Your email</label>
                            <input class="form-control" placeholder="Email" type="email"  name="email"
                                   defaultValue={email} onChange={this.onChangeInput}/>
                        </div> 
                        <div style={{color:'red'}} >{errors.email}</div>
                        <div style={{color:'red'}} >{errors.email_valid}</div>
                        <div class="form-group">
                            <label>Your password</label>
                            <input class="form-control" placeholder="******" type="password" name="password"
                                   defaultValue={password} onChange={this.onChangeInput}/>
                        </div> 
                        <div style={{color:'red'}} >{errors.password}</div>
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary btn-block" onClick={this.register}> register  </button>
                        </div>                                                  
                    </form>
                </article>
            </div> 
        </div>    
        ):null}
        {this.state.SignIn?(
            <SignIn/>
        ):null}    
        </div>
    )
  }
}
export default SignUp;