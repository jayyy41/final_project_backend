import { Post } from "../domain/post";

const posts: Post[] = [];

export const postRepo = {
  getAll: async (): Promise<Post[]> => posts,
  create: async (post: Post): Promise<void> => {
    posts.push(post);
  },
};
