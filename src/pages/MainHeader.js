import {Link} from "react-router-dom";

const MainHeader = () => {
    return(
        <ul>
            <li>
                <Link to="/result">Result Page</Link>
            </li>
        </ul>
    )
}

export default MainHeader;