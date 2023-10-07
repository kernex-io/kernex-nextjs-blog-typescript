import styles from './styles.module.css';
import Link from 'next/link';

export default function CategoryTag(props) {
  const { name, slug } = props;

  return (
    <Link href={`/categories/${slug}`}>
      <span className={styles.category}>{name}</span>
    </Link>
  );
}
