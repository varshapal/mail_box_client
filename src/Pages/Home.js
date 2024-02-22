import { useDispatch } from "react-redux";
import { inboxActions } from "../store/inbox-slice";
import { useHistory } from 'react-router-dom';


const Home = () => {
    
    const history = useHistory();
    const dispatch = useDispatch();

    const profileHandler = () => {
       history.push('/profile');
       }

    return(
        <section>
            <h2>Welcome to your Mail box</h2>
            <button onClick={profileHandler}>Profile</button>
        </section>
    )
};

export default Home;