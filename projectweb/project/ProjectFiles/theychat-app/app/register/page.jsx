"use client";
import "../../../css/styles.css"
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleRegister(e) {
    e.preventDefault();

    const username = e.target.username.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();

    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password })
    });

    if (response.ok) {
      router.push("/login");
    } else {
      const data = await response.json();
      setMessage(data.error || "Registration failed.");
    }
  }

  return (
    <main>
      <section className="container">
        <h1 className="logo">TheyChat</h1>
        <h2>Create Account</h2>

        <form onSubmit={handleRegister}>
          <input type="text" name="username" placeholder="Username" required />
          <input type="email" name="email" placeholder="Email" required />
          <input type="password" name="password" placeholder="Password" required />
          <button type="submit">Register</button>
        </form>

        <p className="error">{message}</p>
        <p>Already have an account?</p>
        <Link href="/login">Login</Link>
      </section>
    </main>
  );
}
