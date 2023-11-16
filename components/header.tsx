import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./header.module.css"
import 'bootstrap/dist/css/bootstrap.css'

export default function Header() {
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className={styles.signedInStatus}>
        <p
          className={`nojs-show ${
            !session && loading ? styles.loading : styles.loaded
          }`}
        >
          <span className={styles.logo}><a href='/'>ITSUMO!</a></span>
          {!session && (
            <>
              <a id="qsLoginBtn" 
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session?.user && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                  className={styles.avatar}
                />
              )}
             <a
               href={`/api/auth/signout`}
               className={styles.button}
               onClick={(e) => {
                 e.preventDefault()
                 signOut()
               }}
             >
               Sign out
             </a>

            </>
          )}
        </p>
      </div>
    </header>
  )
}
