"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosts = getPosts;
const postRepo_memory_1 = require("../infrastructure/postRepo.memory");
async function getPosts() {
    return postRepo_memory_1.postRepo.getAll();
}
//# sourceMappingURL=getPosts.js.map