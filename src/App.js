import { useSelector } from "react-redux";

import Auth from "./Pages/Auth";

import { Route, Switch } from "react-router-dom";

import ComposeMail from "./Pages/ComposeMail";

import InboxPage from "./Pages/InboxPage";
import EmailDetail from "./Pages/EmailDetail";
import SentBox from "./Pages/SentBox";


import Header from "./component/Header";
import SentEmailDetail from "./Pages/SentEmailDetail";




function App() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const isComposemail = useSelector((state) => state.inbox.isComposemail);
  
  return (
    <div>
    <Header />
    {isComposemail && <ComposeMail />}
    
      <Switch>
        <Route path="/" exact>
          {!isAuth && <Auth />}
        </Route>


        {/* <Route path="/home">
          {isAuth && <Home />}
        </Route> */}


        <Route path="/inbox">
          <InboxPage />
        </Route>


        <Route path="/emaildetail">
          <EmailDetail />
        </Route>

        <Route path="/sentemaildetail">
          <SentEmailDetail />
        </Route>

        <Route path="/sentbox">
          <SentBox />
        </Route>

        {/* <Route path="/profile">
          <Profile />
        </Route> */}



        
        
      </Switch> 
    </div>
  );
}

export default App;
