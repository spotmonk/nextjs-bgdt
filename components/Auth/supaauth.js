import { Auth, Typography, Button } from "@supabase/ui";
import { createClient } from "@supabase/supabase-js";
import { useEffect } from "react";
import { supabase } from "./supabase";
import Router from "next/router"

const { Text } = Typography

// Create a single supabase client for interacting with your database


const Container = (props) => {

  const signOut = (event) =>{
    props.supabaseClient.auth.signOut()
  }
  const { user } = Auth.useUser();
  
  
  if (user) {
    loginfunc(supabase.auth.session())
  }
  return props.children;
};

const loginfunc = (session) =>{
  const supatoken = session.access_token
    return fetch('http://' + process.env.NEXT_PUBLIC_APIIP + ':' + process.env.NEXT_PUBLIC_APIPORT + '/login', {
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
      if (!res.valid) {
          props.supabaseClient.auth.signOut()  
      }
      Router.push('/')
    })
}

export default function SupaAuth() {
  
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Container supabaseClient={supabase}>
        <Auth providers={['google']}   supabaseClient={supabase}/>
      </Container>
    </Auth.UserContextProvider>
  );
};