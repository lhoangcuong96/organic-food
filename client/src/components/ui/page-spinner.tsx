import styles from "./page-spinner.module.scss";

export default function Spinner({ className }: { className?: string }) {
  return <span className={`${styles.loader} ${className}`}>Load&nbsp;ng</span>;
}
