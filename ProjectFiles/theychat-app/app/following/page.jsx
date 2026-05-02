"use client";
import "../../../css/styles.css"

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function FollowingPage() {
  const [following, setFollowing] = useState([]);
  const searchParams = useSearchParams();
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
    <main >
      <h2>Following</h2>
      <ul>
        {following.map((f) => (
          <li key={f.followed.id}>{f.followed.username}</li>
        ))}
      </ul>
    </main>
  );
}
