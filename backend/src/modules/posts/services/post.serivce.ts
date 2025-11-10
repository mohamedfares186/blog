import Post from "../models/post.model.ts";
import sanitizeHtml from "sanitize-html";

class PostService {
  async createPost(titleText: string, contentText: string): Promise<Post> {
    const title = sanitizeHtml(titleText);
    const content = sanitizeHtml(contentText);
    return await Post.create({ title, content });
  }
  async viewAll() {
    return await Post.findAll();
  }
  async findPost(text: string): Promise<Post | null> {
    const title = sanitizeHtml(text);
    return await Post.findOne({ where: { title } });
  }
}

export default PostService;
