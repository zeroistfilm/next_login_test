import '../styles/globals.css'
/*import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import { useEffect } from 'react'
import { useRouter } from 'next/router'; 

import { AuthContext } from "../auth/auth-context";
import { useAuth } from "../auth/auth-hook";

function MyApp({ Component, pageProps }) {
  const { token, login, logout, userId } = useAuth(); 
  const router = useRouter();

  useEffect(() => { 
    //console.log("라우터 객체를 출력합니다.",router); // 
    //console.log("Component 객체를 출력합니다.",Component); // 
    //console.log("pageProps 객체를 출력합니다.",pageProps); // 
    //console.log("MyApp >>>>> Token:%s | UserId:%s",token,userId);
    
    if (!(token || userId)) { router.replace("/Signin") }  

  }, [ token, userId ])

  return ( 
    <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login: login,
          logout: logout,
        }}
      >
      <Component {...pageProps} /> 
    </AuthContext.Provider>
  )
}

export default MyApp */

import Head from 'next/head';

import Image from 'next/image'
import styles from '../styles/Home.module.css'  

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
  
import { userService } from 'services';
import { Alert } from 'components';

export default App;


function App({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
      // on initial load - run auth check 
      authCheck(router.asPath);

      // on route change start - hide page content by setting authorized to false  
      const hideContent = () => setAuthorized(false);
      router.events.on('routeChangeStart', hideContent);

      // on route change complete - run auth check 
      router.events.on('routeChangeComplete', authCheck)

      // unsubscribe from events in useEffect return function
      return () => {
          router.events.off('routeChangeStart', hideContent);
          router.events.off('routeChangeComplete', authCheck);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url) {
      // redirect to login page if accessing a private page and not logged in 
      setUser(userService.userValue);
      const publicPaths = ['/account/login', '/account/register'];
      const path = url.split('?')[0];
      if (!userService.userValue && !publicPaths.includes(path)) {
          setAuthorized(false);
          router.push({
              pathname: '/account/login',
              query: { returnUrl: router.asPath }
          });
      } else {
          setAuthorized(true);
      }
  }

  return (
      <>
      <div className={styles.container}>
        <Head>
          <title>Drop Base Manager</title>
          <meta name="description" content="DropBase Manager" />
          <link rel="icon" href="/favicon.ico" /> 
        </Head>

        <div className={`app-container ${user ? 'bg-light' : ''}`}>  
            <Alert />
            {authorized &&
                <Component {...pageProps} />
            }
        </div> 

        <footer className={styles.footer}>
          <a href="https://tpxhq.com"
            target="_blank"
            rel="noopener noreferrer"
          > 
            <span className={styles.logo}>
              <Image src="/TPX.png" alt="TPX Logo" width={75} height={13} />  
            </span>
          </a>
        </footer>
      </div> 
      </>
  );
}