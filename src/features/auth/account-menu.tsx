import type { AppUser, StorageMode } from "../../domain/user";
import { logout } from "../../application/auth-actions";
import styles from "./account.module.css";

export function AccountMenu({
  user,
  storageMode,
}: {
  user: AppUser;
  storageMode: StorageMode;
}) {
  return (
    <details className={styles.menu}>
      <summary>◒ {user.name} ▾</summary>
      <div className={styles.panel}>
        <strong>{user.name}</strong>
        <small>{user.email}</small>
        <p>
          {user.demo ? "Demo profile" : "WorkOS account"} ·{" "}
          {storageMode === "postgres"
            ? "PostgreSQL storage"
            : "Browser demo storage"}
        </p>
        <form action={logout}>
          <button type="submit">Sign out / switch account</button>
        </form>
      </div>
    </details>
  );
}
