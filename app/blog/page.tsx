import NewPostForm from "@/components/NewPostForm";
import { getAllPosts } from "@/services/getPosts";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | Simple Blog",
  description: "My Next JS blog page",
};

export default async function Blog() {
  const posts = await getAllPosts();

  return (
    <>
      <h1>Blog page</h1>
      <Link href="/blog/new" className="add-new">
        Add new post
      </Link>
      <ul className="posts">
        {posts.map((post: { id: string; title: string; body: string }) => (
          <li key={post.id} className="post-item">
            <i>
              <Link href={`/blog/${post.id}`}>{post.title}</Link>
            </i>
          </li>
        ))}
      </ul>

      <NewPostForm />
    </>
  );
}
