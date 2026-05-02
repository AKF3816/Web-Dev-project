"use client";
import Link from "next/link";
import "../../../css/feedStyles.css"

import { useState, useEffect } from "react";

export default function FeedPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("/api/posts");
      const data = await response.json();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  return (<>
  <div className="container">
    <aside className="sidebar">
      <h1>TheyChat</h1>
      <nav className="navbar">
                <ul>
                    <li>
                        <Link href="/profile">
                            <img className="icon" src="/svg/user-profile-person-svgrepo-com.svg"/>
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
                            <img className="icon" src="/svg/login.svg"/>
                            <span>Logout</span>
                        </Link>
                    </li>
                </ul>
            </nav>
    </aside>
    <header>
            <div className="search-bar">
                <input type="text" id="searchInput" placeholder="Search users..."/>
                <div className="search-results" id="searchResults"></div>
            </div>
</header>
        <div className="postbar">
            <form>
                <input id="postText" placeholder="What's on your mind?" type="text"/>
                <button type="button" id="pstButton">Post</button>
            </form>
        </div>
    <section>
      {posts.map((post) => (
        <figure key={post.id} className="Post-box">
          <h2>{post.postAuthor.username}</h2>
          <p>{post.content}</p>
          <p className="timeStamp">{post.timeStamp}</p>
        </figure>
      ))}
    </section>
    </div>
  </>
);

}
