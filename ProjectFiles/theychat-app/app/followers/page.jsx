"use client";
import "../../../css/styles.css"
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function FollowersPage() {
  const [followers, setFollowers] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const userID = searchParams.get("userID");

  useEffect(() => {
    async function fetchFollowers() {
      const response = await fetch(`/api/follow?userID=${userID}`);
      const data = await response.json();
      setFollowers(data);
    }
    if (userID) fetchFollowers();
  }, [userID]);

  return (
    <main>
      <div className="container">
        <h2>Followers</h2>
        <ul id="userList">
          {followers.map((f) => (
            <li key={f.follower.id}>
              <a onClick={() => router.push(`/profile?userID=${f.follower.id}`)} style={{cursor:"pointer"}}>
                {f.follower.username}
              </a>
            </li>
          ))}
        </ul>
        <button onClick={() => router.push(`/profile?userID=${userID}`)}>Back to Profile</button>
      </div>
    </main>
  );
}
