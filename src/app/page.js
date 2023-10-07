import BlogPostCard from '@/components/BlogPostCard';
import BlogPostListContainer from '@/components/BlogPostListContainer';
import kernex from '@/kernex';

async function getData() {
  const response = await kernex.resource('blog-posts').find({
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

  return response.data;
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
