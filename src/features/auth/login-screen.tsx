import { demoUsers } from "../../domain/user";
import { demoLogin } from "../../application/auth-actions";
import styles from "./login.module.css";

export function LoginScreen({
  demo,
  workos,
}: {
  demo: boolean;
  workos: boolean;
}) {
  return (
    <section className={styles.card}>
      <span className={styles.logo}>◒ sprout</span>
      <p className="kicker">A LITTLE CARE, EVERY DAY</p>
      <h1>
        Your plants.
        <br />
        Your own space.
      </h1>
      <p>
        Keep your plants and care progress together, ready for your next visit.
      </p>
      {demo ? (
        <>
          <span className={styles.badge}>Demo login · local development</span>
          <p className={styles.note}>
            Choose a test profile to explore separate plant collections. These
            profiles are not private accounts.
          </p>
          {demoUsers.map((user) => (
            <form key={user.id} action={demoLogin}>
              <input type="hidden" name="profile" value={user.id} />
              <button className={styles.profile} type="submit">
                <span>{user.name[0]}</span>
                <div>
                  <strong>Continue as {user.name}</strong>
                  <small>{user.email}</small>
                </div>
                <b>→</b>
              </button>
            </form>
          ))}
          <p className={styles.note}>
            WorkOS sign-in will replace demo profiles when configured.
          </p>
        </>
      ) : workos ? (
        <a className={styles.signIn} href="/sign-in">
          Continue with WorkOS →
        </a>
      ) : (
        <p role="status">
          Sign-in setup is pending. Configure WorkOS to enable accounts. Demo
          login is available through the local development server.
        </p>
      )}
    </section>
  );
}
