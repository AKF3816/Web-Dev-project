"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function posts() {
    const router = useRouter();
    return <div className="container">
        <div id="postDetails"></div>
        <button onClick={()=>router.push("/feed")}>Back to Feed</button>
    </div>
}