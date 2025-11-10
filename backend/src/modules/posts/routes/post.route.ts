import { Router } from "express";
import PostController from "../controllers/post.controller.ts";

const router = Router();

const post = new PostController();

router.use("/post/create", post.createPost);
router.use("/post/all", post.allPosts);
router.use("/post", post.viewPost);

export default router;
