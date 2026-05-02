"use client";
import "../../../css/feedStyles.css"

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function FollowersPage() {
  const [followers, setFollowers] = useState([]);
  const searchParams = useSearchParams();
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
    <main className="container">
      <h2>Followers</h2>
      <ul>
        {followers.map((f) => (
          <li key={f.follower.id}>{f.follower.username}</li>
        ))}
      </ul>
    </main>
  );
}
