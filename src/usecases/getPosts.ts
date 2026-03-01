import { postRepo } from "../infrastructure/postRepo.memory";

export async function getPosts() {
  return postRepo.getAll();
}
