import React, { Component } from 'react'
import axios from 'axios';
import './css/style.css';

export default class Shops extends Component {
  state={
    Shops:[],
    ShopsPrefer:[],
    NearbyShops:true,
    PreferShops:false,
    class1:"class1",
    class2:"class2"
  }
  componentWillMount(){
    this.props.refreshList()
    this.refresh()
  }
  refresh=()=>{
    var config = {
      headers: {'Authorization':'Token' +' '+localStorage.getItem('token')},
    }
    axios.get('http://127.0.0.1:8000/api/list_shops/',config)
          .then(res => {this.setState({Shops:res.data})}) 
    axios.get('http://127.0.0.1:8000/api/list_prefer_shops/',config)
          .then(res => {this.setState({ShopsPrefer:res.data})})
  }
  logout=()=>{
    localStorage.removeItem('token');
    this.props.log_out()
  }
  NearbyShops=()=>{
    this.setState({
      NearbyShops:true, PreferShops:false,class2:'class2',class1:'class1'
    })
  }
  PreferShops=()=>{
    this.setState({
      PreferShops:true, NearbyShops:false,class2:'class1',class1:'class2'
    })
  }
  remove_shop = (id)=>{
    var config = {
      headers: {'Authorization':'Token' +' '+localStorage.getItem('token')},
      params: {
        id: id,
      },
    }
    axios.get('http://127.0.0.1:8000/api/remove_shop/',config)
         .then(res=>{this.refresh()})
  }
  like_shop = (id)=>{
    var config = {
      headers: {'Authorization':'Token' +' '+localStorage.getItem('token')},
      params: {
        id: id,
      },
    }
    axios.get('http://127.0.0.1:8000/api/like_shop/',config)
          .then(res=>{this.refresh()})
  }
  render() {
    return (
      <div>
        <nav class="navbar navbars-expand-lg navbar-light bg-light">
              <a class="navbar-brand" style={{marginRight:'1200px'}}>Shops</a>
              <span style={{marginRight:'60px'}}>{this.props.username}</span>
              <button class="btn btn-outline-danger" type="submit" onClick={this.logout}>log out</button>
        </nav>
        <div style={{float:'right',marginRight:'50px',paddingTop:'30px'}}>
          <span style={{marginRight:'20px'}}  class={this.state.class1} onClick={this.NearbyShops}>nearby shops</span>
          <span href='#' class={this.state.class2} onClick={this.PreferShops}>my prefer shops</span>
        </div>
        {this.state.NearbyShops?
       ( <div class="row">
          {this.state.Shops.map(shop=>(
            <div class="column">
             <div class="card">
               <h3>{shop.name}</h3>
               <img src={'http://localhost:8000'+shop.image}/>
               <div>
               <button type="button" class="btn btn-danger" style={{marginRight:'200px',marginTop:'10px'}}>DISLIKE</button>
               <button onClick={this.like_shop.bind(this,shop.id)} type="button" class="btn btn-success"  style={{marginTop:'10px'}}>LIKE</button>
               </div>
             </div>
           </div>
          ))}
      </div>):null}
      {this.state.PreferShops?
       ( <div class="row">
          {this.state.ShopsPrefer.map(shop=>(
            <div class="column">
              <div class="card">
                <h3>{shop.name}</h3>
                <img  src={'http://localhost:8000'+shop.image}/>
                <div>
                  <button onClick={this.remove_shop.bind(this,shop.id)} type="button" class="btn btn-danger" style={{marginLeft:'240px',marginTop:'10px'}}>remove</button>
                </div>
              </div>
            </div>
          ))}
          </div>):null}
        
      </div>   
    )
  }
}


const  Shop=()=>{

}