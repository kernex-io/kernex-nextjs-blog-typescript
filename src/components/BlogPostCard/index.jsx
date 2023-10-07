import styles from './styles.module.css';
import Link from 'next/link';
import CategoryTag from '@/components/CategoryTag';

export default function BlogPostCard(props) {
  const { title, thumbnail, slug, createdAt, categories } = props;

  return (
    <Link href={`/posts/${slug}`}>
      <div className={styles.card}>
        <img src={thumbnail.url} alt="thumbnail" className={styles.image} />
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.date}>
          {new Date(createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <div className={styles.categories}>
          {
            categories.map((category) => (
              <CategoryTag key={category._id} name={category.name} slug={category.slug} />
            ))
          }
        </div>
      </div>
    </Link>
  );
}
