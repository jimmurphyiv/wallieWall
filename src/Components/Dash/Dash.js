import React,  {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import './dash.css';



class Dash extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            title: '',
            image: '',
            content: ''
           
        }
    }

    componentDidMount(){
        this.getPosts()
        if(!this.props.w_user.email){
            this.props.history.push('/dash');
        }
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
   
    createPost = () => {
        const {title, image, content} = this.state
        axios.post(`/api/post/${this.props.w_user.id}`, {title, image, content})
        .then(() => {
            
            this.getPosts();
            this.setState({image: ''});
        })
        .catch(err => console.log(err));
    }

    getPosts = () => {
        axios.get(`/api/post/`)
        .then(res => this.setState({posts: res.data}))
        .catch(err => console.log(err));
    }

    render(){
        const mappedPost = this.state.posts.map((post, i) => {
        return <div className='feed-list' key={i}>
            <p>{post.title}</p>
            <img src={post.image} alt='post' />
            <p>{post.content}</p>
        </div>
        })
       
    
        return(
            <section className='flex-container'>
               {mappedPost}
                <div className='profile-box'>
                    <div className='pic'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ4hqw2XMon3rqiCFCBzaoVH-ljz007Om7SkA&usqp=CAU' alt='bender' />
                    </div>
                    <div className='bio'>
                    Subway tile crucifix sustainable man braid fanny pack fashion axe whatever bitters kitsch yr kombucha af messenger bag.Lomo selvage single-origin coffee try-hard beard subway tile jianbing crucifix thundercats vape. Lomo plaid humblebrag mumblecore, offal quinoa fixie taxidermy. Gochujang 3 wolf moon heirloom glossier, squid iceland poke yr slow-carb gluten-free hashtag bicycle rights. Humblebrag sriracha af yuccie, kombucha squid hella selvage
                    </div>
                </div>
               
                <div className='feed'>
                    <h2>FEED</h2>
                    <input 
                    value={this.state.title}
                    name='title'
                    placeholder='Add Title'
                    onChange={this.handleInput}/>
                
                <input
                    value={this.state.image}
                    name='image'
                    placeholder='Add Image URL'
                    onChange={this.handleInput}/>
                
                <input 
                    value={this.state.content}
                    name='content'
                    placeholder='Add Content'
                    onChange={this.handleInput}/>
                <button onClick={this.createPost}>Post</button>
                   
                </div>
                
                <div className='messages'>
                    messages
                </div>
                
            </section>

        )
    }
}

const mapStateToProps = reduxState => {
    return {
        w_user: reduxState.w_user
    }
}

export default connect(mapStateToProps)(Dash);