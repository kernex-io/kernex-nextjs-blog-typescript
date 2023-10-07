import kernex, {BlogPost, Category} from '@/kernex';
import BlogPostCard from '@/components/BlogPostCard';
import BlogPostListContainer from '@/components/BlogPostListContainer';

type BlogPostData = Pick<BlogPost, 'title' | 'thumbnail' | 'createdAt' | '_id' | 'slug'> & {
  categories: Category[];
}

async function getData(): Promise<BlogPostData[]> {
  const response = await kernex.resource('blog-posts').find<BlogPostData>({
    $limit: 10,
    $sort: {
      createdAt: -1,
    },
    $join: [
      {
        resource: 'categories',
        on: 'categories',
        as: 'categories',
      },
    ],
    $select: ['title', 'thumbnail', 'createdAt', '_id', 'slug', 'categories'],
  });

  return response.data as BlogPostData[];
}

export default async function Home() {
  const blogPosts = await getData();

  return (
    <>
      <BlogPostListContainer>
        {
          blogPosts.map((blogPost) => (
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
    </>
  )
}
