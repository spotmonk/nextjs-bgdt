import Head from 'next/head'
import Authed from '../components/Authed/Authed'
import Unauthed from '../components/Unauthed/Unauthed'
import { Auth } from "@supabase/ui"
import { createClient } from '@supabase/supabase-js'
import { supabase } from '../components/Auth/supabase'

import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'

export default function Home() {
  
  const session = supabase.auth.session()
 


  return (
    <div className={styles.container}>
      <Head>
        <title>Board Game Design Tracker</title>
        <meta name="description" content="A Website for tracking board game designs" />
      </Head>
       { 
         supabase.auth.user() ? <Authed /> : <Unauthed />
      }
      

      
      

      <footer className={styles.footer}>
        
      </footer>
    </div>
  )
}
