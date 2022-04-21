import Wrapper from "../assets/wrappers/SmallSidebar"
import {FaTimes} from 'react-icons/fa'
import Logo from './Logo'
import {links} from '../utilities/links'
import {useContextApp} from '../context/contextApp'
import {NavLink} from 'react-router-dom'

const SmallSidebar = () => {
    return (
        <Wrapper>
            <h4>
                <div className="sidebar-container show-sidebar">
                    <div className="content">
                        <button type="button" className="close-btn" onClick={()=>{console.log('toggle sidebar')}}>
                            <FaTimes />
                        </button>
                        <header>
                            <Logo />
                        </header>
                        <div className="nav-links">nav links</div>
                    </div>
                </div>
            </h4>
        </Wrapper>
    )
}

export default SmallSidebar