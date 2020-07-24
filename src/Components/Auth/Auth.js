import React,  {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {getUser} from './Dux/authReducer';

class Auth extends Component {
    constructor(props){
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            username: '',
            password:'',
            email: '',
            profilePic: '',
            registerView: false

        }
    }

    componentDidMount() {
        if(this.props.w_user.email){
            this.props.history.push('/Dash');
        }
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleToggle = () => {
        this.setState({registerView: !this.state.registerView})
    }

    handleRegister = () => {
        const {first_name, last_name, username, password, email, profilePic} = this.state;
           axios.post('/auth/register', {first_name, last_name, username, password, email, profilePic})
            .then(res => {
                this.props.getUser(res.data)
                this.props.history.push('/Dash');
            })
            .catch(err => console.log(err));
       
                
     

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
        return (
        <div className='auth-container'>
            <section className='auth-info'>
                {this.state.registerView
                    ? (<>
                    <h3>Sign-up Here</h3>
                    <input 
                        value={this.state.username}
                        name='username'
                        placeholder='USERNAME'
                        onChange={this.handleInput}/>
                       </>)
                    : <h3>Login Below</h3>}
                     <input 
                        value={this.state.first_name}
                        name='first name'
                        placeholder='First Name'
                        onChange={this.handleInput}/>
                    <input 
                        value={this.state.last_name}
                        name='last name'
                        placeholder='Last Name'
                        onChange={this.handleInput}/>
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
                    {this.state.registerView
                    ? (<>
                        <input
                        value={this.state.picture}
                        name='picture'
                        placeholder='PASTE PIC URL'
                        onChange={this.handleInput}/>

                    <button onClick={this.handleRegister}>REGISTER</button>
                    <p>Already a user? <span onClick={this.handleToggle}><button>LOGIN</button></span></p>
                       </>)
                    : (<>
                    <button onClick={this.handleLogin}>LOGIN</button>
                    <p>No account? <span onClick={this.handleToggle}><button>Sign-up!</button></span></p>
                </>)}
            </section>
                        
        
        </div>
        ) 
    }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {getUser})(Auth);