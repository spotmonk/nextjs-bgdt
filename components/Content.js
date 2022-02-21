import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Switch, Route } from "react-router-dom";
import { supabase } from "../../supabaseClient";

import Topbar from "./Topbar";
import AuthModal from "../Auth/AuthModal";
import NewGame from "../Games/NewGame";

const Content = ({ setLoggedIn, sidebarIsOpen, toggleSidebar }) => 
{
  const loginfunc = (session) =>{
    const supatoken = session.access_token
    console.warn(supatoken)
    // const item = JSON.parse(localStorage.getItem('supabase.auth.token'))
    // const token = item.currentSession.access_token
    return fetch('http://' + process.env.REACT_APP_APIIP + ':' + process.env.REACT_APP_APIPORT + '/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            token:supatoken,
        })
    })
    .then(res => res.json())
    .then(res => {
        if ("valid" in res && res.valid) {
            localStorage.setItem("token", res.token)
            localStorage.setItem("user_id", res.user_id)
            setLoggedIn(true)
            
        }
    
      })
  }

  supabase.auth.onAuthStateChange((event, session) => {
    loginfunc(session)
    
  })
return (
      <>
    <Container
      fluid
      className={classNames("content", { "is-open": sidebarIsOpen })}
    >
      <Topbar toggleSidebar={toggleSidebar} />
      <>
        <Route exact path="/newgame" render={() => {
                return <>
                  <><NewGame /></>
                </>}
        } />
        <Route exact path="/profile" render={() => {
          return <>
            <h1>Profile</h1>
          </>
        }
        } />
    </>
    </Container>
    
  </>
  );
}

export default Content;
