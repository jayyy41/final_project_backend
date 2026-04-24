import { Post } from "../domain/post";

const posts: Post[] = [];

export const postRepo = {
  getAll: async (): Promise<Post[]> => posts,

  create: async (post: Post): Promise<void> => {
    posts.push(post);
  },

  getById: async (id: string): Promise<Post | undefined> => {
    return posts.find((p) => p.id === id);
  },

  update: async (
    id: string,
    title: string,
    body: string,
  ): Promise<Post | undefined> => {
    const post = posts.find((p) => p.id === id);
    if (!post) return undefined;
    post.title = title;
    post.body = body;
    return post;
  },

  delete: async (id: string): Promise<boolean> => {
    const index = posts.findIndex((p) => p.id === id);
    if (index === -1) return false;
    posts.splice(index, 1);
    return true;
  },

  like: async (id: string): Promise<Post | undefined> => {
    const post = posts.find((p) => p.id === id);
    if (!post) return undefined;
    post.likes += 1;
    return post;
  },
};
