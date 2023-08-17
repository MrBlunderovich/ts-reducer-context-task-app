import styles from "./Header.module.css";

type Props = {
  children: React.ReactNode;
};

export default function Header({ children }: Props) {
  return <div className={styles.header}>{children}</div>;
}
