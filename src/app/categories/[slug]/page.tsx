import kernex, {BlogPost, Category} from '@/kernex';
import styles from './styles.module.css';
import BlogPostCard from '@/components/BlogPostCard';
import BlogPostListContainer from '@/components/BlogPostListContainer';

interface BlogPostData extends Pick<BlogPost, 'title' | 'slug' | 'content' | 'thumbnail' | '_id' | 'createdAt'> {
  categories: Category[];
}

async function getData(slug: string): Promise<[Category | null, BlogPostData[]]> {
  const response = await kernex.resource('categories').find({
    $limit: 1,
    slug,
  });

  const [category] = response.data;
  let posts: BlogPostData[] = [];
  if (category) {
    const postsResponse = await kernex.resource('blog-posts').find<BlogPostData>({
      $limit: 10,
      // @ts-ignore
      categories: category?._id,
      $join: [
        {
          resource: 'categories',
          on: 'categories',
          as: 'categories',
        },
      ],
      $select: ['title', 'thumbnail', 'createdAt', '_id', 'slug', 'categories'],
    });

    posts = postsResponse.data;
  }

  return [category, posts];
}

export default async function Page({ params: { slug } }: { params: { slug: string } }) {
  const [category, posts] = await getData(slug);

  if (!category) {
    return (<p className={styles.notFoundText}>Category not found</p>);
  }

  return (
    <div>
      <h1 className={styles.categoryName}>{category.name}</h1>
      <BlogPostListContainer>
        {
          posts.map((blogPost) => (
            <BlogPostCard
              key={blogPost._id}
              title={blogPost.title}
              thumbnail={blogPost.thumbnail}
              slug={blogPost.slug}
              createdAt={blogPost.createdAt}
              categories={blogPost.categories}
            />
          ))
        }
      </BlogPostListContainer>
    </div>
  );
}
