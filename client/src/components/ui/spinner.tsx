import styles from "./spinner.module.scss";

export default function Spinner({ className }: { className?: string }) {
  return <span className={`${styles.loader} ${className}`}>Loading</span>;
}
