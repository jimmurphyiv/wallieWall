import React,  {Component} from 'react';
import './dash.css';



class Dash extends Component {

    render(){
        return(
            <section className='flex-container'>
                
                <div className='profile-box'>
                    <div className='pic'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ4hqw2XMon3rqiCFCBzaoVH-ljz007Om7SkA&usqp=CAU' alt='bender' />
                    </div>
                    <div className='bio'>
                    Subway tile crucifix sustainable man braid fanny pack fashion axe whatever bitters kitsch yr kombucha af messenger bag.Lomo selvage single-origin coffee try-hard beard subway tile jianbing crucifix thundercats vape. Lomo plaid humblebrag mumblecore, offal quinoa fixie taxidermy. Gochujang 3 wolf moon heirloom glossier, squid iceland poke yr slow-carb gluten-free hashtag bicycle rights. Humblebrag sriracha af yuccie, kombucha squid hella selvage
                    </div>
                </div>
               
                <div className='feed'>
                    FEED
                </div>
                
                <div className='messages'>
                    messages
                </div>
                
            </section>

        )
    }
}

export default Dash;