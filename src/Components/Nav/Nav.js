import React,  {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUser, clearUser} from '../../Dux/authReducer';
import axios from 'axios';
import Logo from '../Nav/wallieWall_logo.png';
import './nav.css';


class Nav extends Component {
    constructor(props){
        super(props);
            this.state = {
                w_user: []
            }
        }

        componentDidMount(){
            this.logMeIn()
        }
        
        logMeIn = () => (
            axios.get('/auth/me')
            .then(res => {
                this.props.getUser(res.data);
            })
            .catch(err => console.log(err, 'Timed Out'))
        )
        handleLogout = () => {
            axios.get('/auth/logout')
            .then (() => {
            
            this.props.clearUser()
            this.props.history.push('/')
            })
            .catch(err => console.log(err, 'You up and Logged Out'))
            }

render(){
        return (
            <div className='Nav'>
                
                <nav>
             
                
                    <ul>
                       <li>
                         <Link to='/'
                            onClick={this.handleLogout} >Logout</Link>
                        </li>
                        <li>
                            <Link to='/Contact'>Contact</Link>
                        </li>
                        <li>
                            <Link to='/Search'>Search</Link>
                        </li>
                        <li>
                             <Link to='/Profile'>Profile</Link>
                        </li>
                        <li>
                            <Link to='/Dash'>Dash</Link>
                        </li>
                        <div className='logo'>
                            <img src={Logo} alt="Logo" />
                        </div>
                    </ul>
                </nav>
            </div> 
        ) 
    }
}

const mapStateToProps = reduxState => reduxState;
    
export default connect(mapStateToProps, {getUser, clearUser})(Nav);
