import React, { Component } from "react";
import nodemailer from '../../'
import './contact.css';

class Contact extends Component{
    render(){
        return(
            <div>
                <section className='contact-box'>
                    <h2>CONTACT</h2>
                    <div className='email-box'>
                        EMAIL
                    </div>
                </section>
                
            </div>
        )
    }
}

export default Contact;