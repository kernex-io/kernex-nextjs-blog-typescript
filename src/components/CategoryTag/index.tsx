import {Category} from '@/kernex';
import styles from './styles.module.css';
import Link from 'next/link';

interface CategoryTagProps extends Pick<Category, 'name' | 'slug'> {}

export default function CategoryTag(props: CategoryTagProps) {
  const { name, slug } = props;

  return (
    <Link href={`/categories/${slug}`}>
      <span className={styles.category}>{name}</span>
    </Link>
  );
}
