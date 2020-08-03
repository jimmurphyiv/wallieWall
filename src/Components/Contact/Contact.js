import React, { Component } from "react";
import {connect} from 'react-redux';
import {getUser} from '../../Dux/authReducer';
import axios from 'axios';
import './contact.css';


class Contact extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            subject: '',
            content: ''

        }
    }


    handleInput = (val) => {
        this.setState({ email: val, subject: val, content: val })
    }

    sendEmail = () => {
        const {id} = this.props.w_user
        const {email, subject, content} = this.state
      axios.post(`/api/email${id}`, {email, subject, content})
      .then(() => {
          alert('Email Sent')
      })
      .catch(err => console.log(err));

    }


    render(){
        return(
          
            <div className='contact-box'>
                <input
                    name='email'
                    type='text'
                    placeholder='ENTER EMAIL'
                    onChange={this.handleInput}>
                </input>
                <input
                    name='subject'
                    type='text'
                    placeholder='ENTER SUBJECT'
                    onChange={this.handleInput}>
                </input>
                <textarea
                    name='content'
                    type='text'
                    placeholder='ENTER CONTENT'
                    onChange={this.handleInput}>
                </textarea>  
            <button onClick={this.sendEmail}>SEND EMAIL</button>

                    
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return{
        aR: reduxState.authReducer,
        uR: reduxState.userReducer  
    }
}


export default connect(mapStateToProps, {getUser})(Contact);