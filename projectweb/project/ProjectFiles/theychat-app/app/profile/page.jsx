"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import "../../../css/profileStyles.css"

function formatDate(ts) {
  return new Date(ts).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editBio, setEditBio] = useState("");
  const [editName, setEditName] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [currentUserID, setCurrentUserID] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const viewID = searchParams.get("userID");

  async function refreshUser(id) {
    const res = await fetch(`/api/users?id=${id}`);
    const data = await res.json();
    setUser(data);
    setEditBio(data.bio || "");
    setEditName(data.name || "");
  }

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) { router.push("/login"); return; }

    const targetID = viewID || currentUser.id;
    setIsOwnProfile(targetID === currentUser.id);
    setCurrentUserID(currentUser.id);

    async function checkFollowing() {
      const res = await fetch(`/api/follow?followingID=${currentUser.id}`);
      const data = await res.json();
      setIsFollowing(data.some(f => f.followed.id === targetID));
    }
    if (targetID !== currentUser.id) checkFollowing();

    async function fetchUser() {
      const res = await fetch(`/api/users?id=${targetID}`);
      const data = await res.json();
      setUser(data);
      setEditBio(data.bio || "");
      setEditName(data.name || "");
    }

    async function fetchPosts() {
      const res = await fetch(`/api/posts?userId=${targetID}`);
      const data = await res.json();
      setPosts(data);
    }

    fetchUser();
    fetchPosts();
  }, [searchParams]);

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <h1>TheyChat</h1>
      <div className="container">

        <header className="header">
          <nav className="navbar">
            <ul>
              <li>
                <Link href="/profile">
                  <img className="icon" src="/svg/user-profile-person-svgrepo-com.svg" />
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link href="/feed">
                  <img className="icon" src="/svg/newsFeed.svg" />
                  <span>News</span>
                </Link>
              </li>
              <li>
                <Link href="/login">
                  <img className="icon" src="/svg/login.svg" />
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </nav>
          <Link href="/feed" className="back-link">Back to Feed</Link>
        </header>

        <main className="center">
          <div className="profile">

            <section className="profile-header">
              <div className="profile-cover"></div>
              <div className="profile-info">
                <div>
                  <div className="profile-avatar">{user.username?.[0]?.toUpperCase()}</div>
                  <h2>{user.name || user.username}</h2>
                  <p>@{user.username}</p>
                  <p>{user.email}</p>
                  {user.bio && <p id="bio">{user.bio}</p>}
                </div>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {isOwnProfile ? (
                    <button onClick={() => setShowEditModal(true)}>Edit Profile</button>
                  ) : (
                    <button onClick={async () => {
                      if (isFollowing) {
                        const res = await fetch(`/api/follow?followingID=${currentUserID}`);
                        const data = await res.json();
                        const follow = data.find(f => f.followed.id === user.id);
                        if (follow) await fetch(`/api/follow`, { method: "DELETE", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ followerID: currentUserID, followedID: user.id }) });
                      } else {
                        await fetch("/api/follow", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ followerID: currentUserID, followedID: user.id }) });
                      }
                      setIsFollowing(!isFollowing);
                      refreshUser(user.id);
                    }}>
                      {isFollowing ? "Unfollow" : "Follow"}
                    </button>
                  )}
                </div>
              </div>
            </section>

            <div className="links">
              <Link href={`/followers?userID=${user.id}`}>
                <span>{user._count?.followers ?? 0}</span>
                Followers
              </Link>
              <Link href={`/following?userID=${user.id}`}>
                <span>{user._count?.following ?? 0}</span>
                Following
              </Link>
            </div>

            <section className="posts">
              {posts.length === 0 ? (
                <p>No posts yet.</p>
              ) : (
                posts.map((post) => (
                  <figure key={post.id} className="Post-box">
                    <p>{post.content}</p>
                    <p className="timeStamp">{formatDate(post.timeStamp)}</p>
                  </figure>
                ))
              )}
            </section>

          </div>
        </main>
      </div>

      {showEditModal && (
        <div className="modal-overlay open" onClick={() => setShowEditModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Edit Profile</h2>
            <label>Name</label>
            <input
              type="text"
              placeholder="Your display name"
              value={editName}
              onChange={e => setEditName(e.target.value)}
            />
            <label>Bio</label>
            <textarea
              rows={3}
              placeholder="Write something about yourself..."
              value={editBio}
              onChange={e => setEditBio(e.target.value)}
            />
            <div className="modal-btns">
              <button onClick={async () => {
                const currentUser = JSON.parse(localStorage.getItem("currentUser"));
                const res = await fetch(`/api/users?id=${currentUser.id}`, {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ name: editName, bio: editBio }),
                });
                if (res.ok) {
                  const updated = await res.json();
                  localStorage.setItem("currentUser", JSON.stringify({ ...currentUser, name: updated.name, bio: updated.bio }));
                  setUser(prev => ({ ...prev, name: updated.name, bio: updated.bio }));
                }
                setShowEditModal(false);
              }}>Save</button>
              <button id="cancelBtn" onClick={() => setShowEditModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
