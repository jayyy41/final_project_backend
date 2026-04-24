import { Comment } from "../domain/comment";

const comments: Comment[] = [];

export const commentRepo = {
  getByPostId: async (postId: string): Promise<Comment[]> => {
    return comments.filter((c) => c.postId === postId);
  },

  create: async (comment: Comment): Promise<Comment> => {
    comments.push(comment);
    return comment;
  },

  update: async (id: string, body: string): Promise<Comment | undefined> => {
    const comment = comments.find((c) => c.id === id);
    if (!comment) return undefined;
    comment.body = body;
    return comment;
  },

  delete: async (id: string): Promise<boolean> => {
    const index = comments.findIndex((c) => c.id === id);
    if (index === -1) return false;
    comments.splice(index, 1);
    return true;
  },
};
