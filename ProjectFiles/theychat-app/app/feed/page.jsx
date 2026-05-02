"use client";
import "../../../css/feedStyles.css"



import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState("");
  const router = useRouter();


  async function fetchPosts() {
    const response = await fetch("/api/posts");
    const data = await response.json();
    setPosts(data);
  }

  useEffect(() => {
    fetchPosts();
  }, []);



  async function createPost() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      window.location.href = "/login";
      return;
    }

    if (postText.trim() === "") return;

    await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: postText,
        userId: currentUser.id,
      }),
    });

    setPostText("");
    fetchPosts();
  }

  async function handleLike(postID) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;

    const res = await fetch(`/api/likes?postID=${postID}`);
    const existingLikes = await res.json();
    const existing = existingLikes.find(l => l.UserID === currentUser.id);

    if (existing) {
      await fetch(`/api/likes/${existing.id}`, { method: "DELETE" });
    } else {
      await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postID, UserID: currentUser.id })
      });
    }
    fetchPosts();
  }

  async function handleDelete(postID) {
    await fetch(`/api/posts/${postID}`, { method: "DELETE" });
    fetchPosts();
  }

  return (
    <div className="container">
      <aside className="sidebar">
        <h1>TheyChat</h1>
        <nav>
          <ul>
            <li>
              <Link href="/profile">
                <img
                  className="icon"
                  src="/svg/user-profile-person-svgrepo-com.svg"
                  alt="Profile"
                />
                Profile
              </Link>
            </li>

            <li>
              <Link href="/feed">
                <img className="icon" src="/svg/newsFeed.svg" alt="News" />
                News
              </Link>
            </li>

            <li>
              <Link href="/login">
                <img className="icon" src="/svg/login.svg" alt="Logout" />
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <header className="header">
        
        <div className="search-bar">
          <input type="text" placeholder="Search users..." />
          <div className="search-results"></div>
        </div>
      </header>

      <div className="postbar">
        <input
          placeholder="What's on your mind?"
          type="text"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />

        <button type="button" onClick={createPost}>
          Post
        </button>
      </div>

      <section className="center">
        {posts.length === 0 ? (
          <p>No posts to display.</p>
        ) : (
          posts.map((post) => (
            <figure key={post.id} className="Post-box">
              <h2>{post.postAuthor?.username}</h2>
              <p>{post.content}</p>
              <p className="timeStamp">{post.timeStamp}</p>
              <button className="like-btn" onClick={() => handleLike(post.id)}>
                Like ({post._count?.likes})
              </button>
              <button className="view-btn" onClick={() => router.push(`/post?postID=${post.id}`)}>
                    View Details ({post._count?.comments} comments)
              </button>

              {post.postAuthor?.id === JSON.parse(localStorage.getItem("currentUser"))?.id && (
                <button className="delete-btn" onClick={() => handleDelete(post.id)}>
                  Delete
                </button>
              )}
            </figure>
          ))
        )}
      </section>
    </div>
  );
}
