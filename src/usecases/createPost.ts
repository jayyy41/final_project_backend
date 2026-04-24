import { randomUUID } from "crypto";
import { postRepo } from "../infrastructure/postRepo.memory";

export async function createPost(input: {
  title: string;
  body: string;
  authorId: string;
}) {
  const newPost = {
    id: randomUUID(),
    title: input.title,
    body: input.body,
    authorId: input.authorId,
    likes: 0,
    createdAt: new Date().toISOString(),
  };

  await postRepo.create(newPost);
  return newPost;
}
