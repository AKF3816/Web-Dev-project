"use client";
import Link from "next/link";
import "../../../css/profileStyles.css"
export default function ProfilePage() {



    return<>
    <h1>TheyChat</h1>
    <div className="container">

        <header className="header">
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
                            <img className="icon" src="/svg/newsFeed.svg"/>
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
        </header>

        <main className="center">
            <div className="profile">

                <section className="profile-header">
                    <div className="profile-cover"></div>
                    <div className="profile-info">
                        <div>
                            <div className="profile-avatar" id="avatarInitial"></div>
                            <h2 id="username"></h2>
                            <p id="email"></p>
                            <p id="bio"></p>
                        </div>
                        <div style={{display:"flex", gap:"0.5rem", flexWrap:"wrap"}}>
                            <button id="followBtn">Follow</button>
                            <button id="editBtn">Edit Profile</button>
                        </div>
                    </div>
                </section>

                <div className="links">
                    <Link href="/followers">
                        <span id="followersCount">0</span>
                        Followers
                    </Link>
                    <Link href="/following">
                        <span id="followingCount">0</span>
                        Following
                    </Link>
                </div>

                <section id="userPosts" className="posts"></section>

            </div>
        </main>
    </div>
  <div className="modal-overlay" id="modalOverlay">
      <div className="modal">
          <h2>Edit Profile</h2>
          <label>Email</label>
          <input type="email" id="editEmail" placeholder="Email"/>
          <label>Bio</label>
          <input type="text" id="editBio" placeholder="Write something about yourself..."/>
          <div className="modal-btns">
              <button id="saveBtn">Save</button>
              <button id="cancelBtn">Cancel</button>
          </div>
      </div>
  </div>
  </>
};