import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import Button from './../Button/Button';

function Navbar() {

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);

  const showButton = () => {
    if(window.innerWidth <=960) {
      setButton(false);
    } else {
      setButton(true);
    }
  }

  return (
<div>
    <nav className="navbar">
        <div className="navbar-container">
            {/* <Link to="/" className="navbar-logo">
                FIND MY DEN <i className="fab fa-typo3"></i>
            </Link> */}
            {/* {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>} */}
        </div>
    </nav>
</div>
  )
}

export default Navbar