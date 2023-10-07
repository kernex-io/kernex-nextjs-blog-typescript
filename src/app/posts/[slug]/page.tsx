import kernex, {BlogPost, Category} from '@/kernex';
import styles from './styles.module.css';
import CategoryTag from '@/components/CategoryTag';

interface BlogPostData extends Pick<BlogPost, 'title' | 'slug' | 'content' | 'thumbnail'> {
  categories: Category[];
}

async function getPost(slug: string): Promise<BlogPostData> {
  const response = await kernex.resource('blog-posts').find<BlogPostData>({
    $limit: 1,
    slug,
    $join: [
      {
        resource: 'categories',
        on: 'categories',
        as: 'categories',
      },
    ],
    $select: ['title', 'slug', 'content', 'thumbnail', 'categories'],
  });

  return response.data[0];
}

export default async function Page({ params: { slug } }: { params: { slug: string } }) {
  const post = await getPost(slug);
  return (
    <div className={styles.container}>
      <div className={styles.blogPostContainer}>
        <img src={post.thumbnail.url} className={styles.thumbnail} />
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
      <div className={styles.sidebarContainer}>
        <p className={styles.sidebarTitle}>Categories</p>
        <div className={styles.categoriesContainer}>
          {
            post.categories.map((category) => (
              <CategoryTag
                key={category._id}
                name={category.name}
                slug={category.slug}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}
