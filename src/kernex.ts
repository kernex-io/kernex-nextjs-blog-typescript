import kernexClient from '@kernex/client';

export interface Category {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  slug: string;
}

export interface BlogPost {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  slug: string;
  content: string;
  thumbnail: {
    url: string;
    title?: string;
    description?: string;
  };
  categories: string[];
}

type Resources = {
  categories: Category;
  'blog-posts': BlogPost;
};

// Replace with your own app endpoint
const kernex = kernexClient<Resources>({
  appUrl: process.env.KERNEX_APP_URL as string,
  appApiKey: process.env.KERNEX_APP_API_KEY as string,
});

export default kernex;
