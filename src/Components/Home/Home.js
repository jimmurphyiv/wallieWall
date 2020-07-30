import React, { Component } from "react";
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {getUser} from '../../Dux/authReducer';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import wwcarousel from '../../wwcarousel';
import './home.css';
import Nav from '../Nav/Nav';


class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',

        }
        
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleLogin = () => {
        const {email, password} = this.state;
        axios.post('/auth/login', {email, password})
       
        .then(res => {
            this.props.getUser(res.data)
            this.props.history.push('/Dash');
            
        })
        .catch(err => console.log(err));
        
    }
    render(){
        return(
            <div>
                <Nav />
                <div className='l-block'>
                <input 
                    value={this.state.email}
                    name='email'
                    placeholder='EMAIL'
                    onChange={this.handleInput}/>
                <input 
                    type='password'
                    value={this.state.password}
                    name='password'
                    placeholder='PASSWORD'
                    onChange={this.handleInput}/>
                <button onClick={this.handleLogin} >LOGIN</button>
                
            <Link to='/Auth'>
                    <button onClick={this.handleRegister} >SIGN-UP!</button></Link>
                </div>
                <section className='sneek-peek'>
                    <h1>SNEEK PEEK</h1>
                <Carousel autoPlay>
                <div className='sneek-pic'>
                    <img src="src/wwcarousel/1.jpeg" alt=''/>
                    
                </div>
                <div className='sneek-pic'>
                    <img src="wwcarousel/2.jpeg" alt=''/>
                    
                </div>
                <div className='sneek-pic'>
                    <img src="wwcarousel/3.jpeg" alt=''/>
                    
                </div>
                <div className='sneek-pic'>
                    <img src="wwcarousel/4.jpeg" alt=''/>
                    
                </div>
                <div className='sneek-pic'>
                    <img src="wwcarousel/5.jpeg"  alt=''/>
                    
                </div>
                <div className='sneek-pic'>
                    <img src="wwcarousel/6.jpeg" alt=''/>
                    
                </div>
                <div className='sneek-pic'>
                    <img src="wwcarousel/7.jpeg" alt=''/>
                    
                </div>
                <div className='sneek-pic'>
                    <img src="wwcarousel/8.jpeg" alt=''/>
                    
                </div>
            </Carousel>
                </section>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {getUser})(Home);