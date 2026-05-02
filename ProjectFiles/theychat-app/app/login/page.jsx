"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function Logger(e) {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    const response = await fetch("/api/users");
    const users = await response.json();

    const user = users.find(
      (i) => i.email === email && i.password === password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      router.push("/feed");
    } else {
      setMessage("Invalid email or password");
    }
  }

  return (
    <main>
      <section className="container">
        <h1 className="logo">TheyChat</h1>
        <h2>Login</h2>

        <form id="loginForm" onSubmit={Logger}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />

          <button type="submit">Login</button>
        </form>

        <p id="loginMessage" className="error">
          {message}
        </p>

        <p>No account yet?</p>

        <Link href="/register">Register</Link>
      </section>
    </main>
  );
}