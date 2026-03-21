
import { NavLink, Outlet } from 'react-router-dom';

function Layout() {
    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li><NavLink to="/">Login</NavLink></li>
                        <li><NavLink to="/register">Register</NavLink></li>
                        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                    </ul>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    );
}
export default Layout;