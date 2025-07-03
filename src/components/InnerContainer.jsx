import styles from "./innerContainer.module.css";

export default function itemContainer({children})
{
    return <div className={styles.innerContainer}>{children}</div>
}