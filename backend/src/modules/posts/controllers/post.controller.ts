import type { Request, Response } from "express";
import PostService from "../services/post.serivce.ts";

class PostController {
  constructor(protected post = new PostService()) {
    this.post = post;
  }
  createPost = async (req: Request, res: Response): Promise<Response> => {
    const { title, content } = req.body;
    if (!title || !content)
      return res
        .status(400)
        .json({ message: "Title and content fields are required" });

    const post = await this.post.createPost(title, content);
    if (!post)
      return res.status(500).json({
        message: "Couldn't save the the post, please try again later",
      });
    return res
      .status(201)
      .json({ message: "Post has been created successfully" });
  };

  allPosts = async (req: Request, res: Response): Promise<Response> => {
    const posts = await this.post.viewAll();
    if (!posts)
      return res.status(404).json({ message: "there are no posts to show" });
    return res.status(200).json({ message: "success", posts });
  };

  viewPost = async (req: Request, res: Response): Promise<Response> => {
    const { title } = req.query;
    if (!title || Array.isArray(title) || typeof title !== "string")
      return res
        .status(400)
        .json({ message: "Title field is required and must be a string" });
    const post = await this.post.findPost(title);
    if (!post) return res.status(404).json({ message: "Post not found" });

    return res.status(200).json({ message: post });
  };
}

export default PostController;
