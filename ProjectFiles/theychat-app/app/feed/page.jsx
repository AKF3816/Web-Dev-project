"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [postText, setPostText] = useState("");

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

  return (
    <div className="container">
      <aside className="sidebar">
        <h1>TheyChat</h1>

        <nav className="navbar">
          <ul>
            <li>
              <Link href="/profile">
                <img
                  className="icon"
                  src="/svg/user-profile-person-svgrepo-com.svg"
                  alt="Profile"
                />
                <span>Profile</span>
              </Link>
            </li>

            <li>
              <Link href="/feed">
                <img className="icon" src="/svg/newsFeed.svg" alt="News" />
                <span>News</span>
              </Link>
            </li>

            <li>
              <Link href="/login">
                <img className="icon" src="/svg/login.svg" alt="Logout" />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      <header>
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

      <section>
        {posts.length === 0 ? (
          <p>No posts to display.</p>
        ) : (
          posts.map((post) => (
            <figure key={post.id} className="Post-box">
              <h2>{post.postAuthor?.username}</h2>
              <p>{post.content}</p>
              <p className="timeStamp">{post.timeStamp}</p>
              <p>Likes: {post._count?.likes}</p>
              <p>Comments: {post._count?.comments}</p>
            </figure>
          ))
        )}
      </section>
    </div>
  );
}