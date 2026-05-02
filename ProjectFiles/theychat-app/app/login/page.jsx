"use client";
import { useState } from "react";
import Link from "next/link";
export default function LoginPage(){
const [message,setMessage] = useState("");
function  Logger(e){
e.preventDefault();
const email = e.target.email.value.trim();
const password = e.target.password.value.trim();
const Users = JSON.parse(// api endpoint
    )
const user = Users.find( (i) => i.email === email && i.password === password);
//if user true set current user to the user = to email
//move to feed.chat
//else {setmessage("invalid email or password")} 
}


return <main>

<section class="container">
<h1 classname="logo">TheyChat</h1>
<h2>Login</h2>

<form id="loginForm" onSubmit={Logger}>

<input type="email" name="email" id="email" placeholder="Email" required />

<input type="password" name="password" id="password" placeholder="Password" required />

<button type="submit">Login</button>

</form>

<p id="loginMessage" class="error"></p>

<p>No account yet?</p>

<a Link href="/register">Register</a>

</section>

</main>;
}