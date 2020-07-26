import React,  {Component} from 'react';
import axios from 'axios'
import { connect } from 'react-redux';


class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            username: '',
            profile_pic: '',
            editView: false
        }
    }
  

    handleInput = (val) => {
        this.setState({ first_name: val, last_name: val, username: val, profile_pic: val })
    }
    handleEditView = () => {
        this.setState({editView: !this.state.editView})
    }
    editProfile = () => {
        const {first_name, last_name, username, profile_pic} = this.state;
        axios.put(`/auth/edit/${this.props.w_user.id}`, 
        {first_name, last_name, username, profile_pic})
        .then(res => {
            this.props.getUser(res.data[0]);
            this.handleEditView();
            this.setState({
                first_name: '',
                last_name: '',
                username: '',
                profile_pic: ''
            });
        })
        .catch(err => console.log(err));
    }

    render(){
        return (
            <div className='dash'>
                
                <img 
                    className='profile'
                    src={this.props.w_user.profilePic}
                    alt={this.props.w_user.username}/>
                {!this.state.editView
                ? <h2>{this.props.w_user.username} <button id='edit-button' onClick={this.handleEditView}>Edit</button></h2>
                : (<div><input 
                    value={this.state.first_name}
                    placeholder='NEW FIRST NAME'
                    onChange={(e) => this.handleInput(e.target.value)}/>
                <button id='edit-button' onClick={this.updateFirst_name}>Submit</button><input 
                        value={this.state.last_name}
                        placeholder='NEW LAST NAME'
                        onChange={(e) => this.handleInput(e.target.value)}/>
                    <button id='edit-button' onClick={this.updateLast_name}>Submit</button><input 
                        value={this.state.username}
                        placeholder='NEW USERNAME'
                        onChange={(e) => this.handleInput(e.target.value)}/>
                    <button id='edit-button' onClick={this.updateUsername}>Submit</button>
                    <input 
                        value={this.state.profile_pic}
                        placeholder='NEW PROFILE PIC'
                        onChange={(e) => this.handleInput(e.target.value)}/>
                    <button id='edit-button' onClick={this.updateProfile_pic}>Submit</button>
                </div>)
                }
            </div>
        )
    } 

}

export default connect(state => state)(Dashboard);