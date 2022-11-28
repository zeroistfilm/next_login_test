import { userService } from 'services';
import { Link } from 'components';
import styles from '../styles/Home.module.css'  
import Dashboard from 'components/Dashboard';

export default Home;

function Home() {
    /*return (
        <div className="p-4">
            <div className="container">
                <h1>Hi {userService.userValue?.firstName}!</h1>
                <p>You&apos;re logged in with Next.js & JWT!!</p>
                <p><Link href="/users">Manage Users</Link></p>
            </div>
        </div>
    );*/
    return(
        <div className={styles.container}> 
          <main>
            <Dashboard/>
          </main> 
        </div>
    );
}
