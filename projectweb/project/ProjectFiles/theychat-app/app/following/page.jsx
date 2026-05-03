"use client";
import "../../../css/styles.css"
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function FollowingPage() {
  const [following, setFollowing] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const userID = searchParams.get("userID");

  useEffect(() => {
    async function fetchFollowing() {
      const response = await fetch(`/api/follow?followingID=${userID}`);
      const data = await response.json();
      setFollowing(data);
    }
    if (userID) fetchFollowing();
  }, [userID]);

  return (
    <main>
      <div className="container">
        <h2>Following</h2>
        <ul id="userList">
          {following.map((f) => (
            <li key={f.followed.id}>
              <a onClick={() => router.push(`/profile?userID=${f.followed.id}`)} style={{cursor:"pointer"}}>
                {f.followed.username}
              </a>
            </li>
          ))}
        </ul>
        <button onClick={() => router.push(`/profile?userID=${userID}`)}>Back to Profile</button>
      </div>
    </main>
  );
}
