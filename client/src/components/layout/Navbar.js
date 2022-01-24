import { Link } from 'react-router-dom';
import classes from './Navbar.css'

function Navbar() {
    return (
        <header className={classes.header}>
            <nav>
                <ul>
                    {/* <li><Link to='/'>ALL ORDERS</Link></li> */}
                    <li><Link to='/triage'>TRIAGE</Link></li>
                    <li><Link to='/dashboard'>DASHBOARD</Link></li>
                    <li><Link to='/completed'>COMPLETED</Link></li>
                    <li><Link to='/create-new-order'>CREATE NEW ORDER</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar
