import { randomUUID } from "crypto";
import { postRepo } from "../infrastructure/postRepo.memory";

export async function createPost(input: { title: string; body: string }) {
  const newPost = {
    id: randomUUID(),
    title: input.title,
    body: input.body,
  };

  await postRepo.create(newPost);
  return newPost;
}
