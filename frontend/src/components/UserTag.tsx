import styles from "src/components/UserTag.module.css";

import type { User } from "src/api/users";

export interface UserItemProps {
  user: User;
}

export function UserTag({ user: User }: UserItemProps) {
  return (
    <div className={styles.userTag}>
      <img
        src={User.profilePictureURL ? User.profilePictureURL : "/userDefault.svg"}
        alt={User.name}
      />
      <span>{User.name || "Unknown User"}</span>
    </div>
  );
}
