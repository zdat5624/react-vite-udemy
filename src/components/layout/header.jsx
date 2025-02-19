import './header.css';
import { Link } from 'react-router-dom';

const Header = () => {


    return (
        <ul>
            <li><Link class="active" to="/">Home</Link></li>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/products">Products</Link></li>
        </ul>
    )
}

export default Header