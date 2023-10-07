import styles from './styles.module.css';

export default function BlogPostListContainer(props) {
  const { children } = props;

  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}
