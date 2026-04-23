"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepo = void 0;
const posts = [];
exports.postRepo = {
    getAll: async () => posts,
    create: async (post) => {
        posts.push(post);
    },
};
//# sourceMappingURL=postRepo.memory.js.map