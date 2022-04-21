import Wrapper from "../assets/wrappers/BigSidebar"
import { useContextApp } from "../context/contextApp"
import NavLinks from "./NavLinks"
import Logo from '../components/Logo'

const BigSidebar = () => {
    const {showSideBar, toggleSidebar} = useContextApp()
    return (
        <Wrapper>
            <div className={showSideBar?'sidebar-container' : 'sidebar-container show-sidebar' }>
                <div className="content">
                    <header>
                        <Logo />
                    </header>
                    <NavLinks toggleSidebar={toggleSidebar}/>
                </div>
            </div>
        </Wrapper>
    )
}

export default BigSidebar