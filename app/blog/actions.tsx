"use server";
import { prisma } from "@/lib/prisma";
import type { Post } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(data: FormData) {
  const { title, body } = Object.fromEntries(data) as Omit<Post, "id">;

  const post = await prisma.post.create({
    data: {
      title,
      body,
    },
  });

  redirect(`/blog/${post.id}`);
}

export async function updatePost(data: FormData) {
  const { title, body, id } = Object.fromEntries(data) as Post;

  const post = await prisma.post.update({
    where: {
      id,
    },
    data: {
      title,
      body,
    },
  });

  revalidatePath(`/blog/${post.id}`);
  redirect(`/blog/${post.id}`);
}

export async function deletePost(id: string) {
  await prisma.post.delete({
    where: {
      id,
    },
  });

  revalidatePath("/blog");
  redirect("/blog");
}

// "use server";

// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

// const BASE_URL = "https://673dfa890118dbfe8609a017.mockapi.io";

// export async function updatePost(data: FormData) {
//   const { title, body, id } = Object.fromEntries(data);

//   await fetch(`${BASE_URL}/posts/${id}`, {
//     method: "PATCH",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ title, body }),
//   });

//   // const post = await response.json();

//   // revalidatePath(`/blog/${post.id}`);
//   // redirect(`/blog/${post.id}`);

//   revalidatePath("/blog");
//   redirect(`/blog/`);
// }

// export async function deletePost(id: string) {
//   await fetch(`${BASE_URL}/posts/${id}`, {
//     method: "DELETE",
//     headers: { "content-type": "application/json" },
//   });

//   revalidatePath("/blog");
//   redirect(`/blog/`);
// }
