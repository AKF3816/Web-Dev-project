"use client";
import "../../../css/styles.css"
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PostPage() {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const postID = searchParams.get("postID");

  useEffect(() => {
    if (!postID) return;
    async function fetchPost() {
      const res = await fetch(`/api/posts/${postID}`);
      const data = await res.json();
      setPost(data);
    }
    async function fetchComments() {
      const res = await fetch(`/api/comments?postID=${postID}`);
      const data = await res.json();
      setComments(data);
    }
    fetchPost();
    fetchComments();
  }, [postID]);

  async function addComment() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser || commentText.trim() === "") return;
    await fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: commentText, UserID: currentUser.id, postID })
    });
    setCommentText("");
    const res = await fetch(`/api/comments?postID=${postID}`);
    setComments(await res.json());
  }

  if (!post) return <p>Loading...</p>;

  return (
    <main>
      <div className="container">
        <h2>{post.postAuthor?.username}</h2>
        <p>{post.content}</p>
        <p className="timeStamp">{post.timeStamp}</p>
        <div className="comments-section">
          <input
            type="text"
            placeholder="Add a comment..."
            className="comment-input"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button className="comment-btn" onClick={addComment}>Comment</button>
          <div className="comments-list">
            {comments.map((c) => (
              <p key={c.commentID}>
                <strong>{c.user?.username}:</strong> {c.content}
              </p>
            ))}
          </div>
        </div>
        <button onClick={() => router.push("/feed")}>Back to Feed</button>
      </div>
    </main>
  );
}
