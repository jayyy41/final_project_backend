"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = createPost;
const crypto_1 = require("crypto");
const postRepo_memory_1 = require("../infrastructure/postRepo.memory");
async function createPost(input) {
    const newPost = {
        id: (0, crypto_1.randomUUID)(),
        title: input.title,
        body: input.body,
    };
    await postRepo_memory_1.postRepo.create(newPost);
    return newPost;
}
//# sourceMappingURL=createPost.js.map