import { Link } from 'react-router-dom';
import vidsrc from '../img/home.mp4';
 
function Home(props){ 
  return(
    <>
      <div id = 'home'>
        <video muted autoPlay loop className='v-home'>
            <source src={vidsrc} type='video/mp4'/>
        </video>
        <div id = 'option'>
            <div className='button1'> 
                <Link to="/main" id="go">Explore this world</Link>
            </div> 
            {props.loggedUser == "" ? <div className='button2'><Link to="/login" id="gologin">Log in</Link></div> : null}
        </div>
      </div>
    </>
  )
}
export default Home;