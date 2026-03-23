
/* ---------- REGISTER ---------- */

const registerForm = document.getElementById("registerForm");

if(registerForm){

registerForm.addEventListener("submit", function(e){

e.preventDefault();
const username = document.getElementById("username").value.trim();
const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value.trim();
const message = document.getElementById("registerMessage");
message.innerText = "";

if(!email.includes("@")){
message.innerText = "Invalid email format";
return;
}

if(password.length < 6){
message.innerText = "Password must be at least 6 characters";
return;
}

let users = JSON.parse(localStorage.getItem("users")) || [];

/* check if email already exists */

const exists = users.find(user => user.email === email);

if(exists){
message.innerText = "Email already registered";
return;
}

/* create new user */
const newUser = {

id: Date.now(),

username: username,

email: email,

password: password,

bio: "",

profilePic: "default.png",

followers: [],

following: [],

posts: []

};

users.push(newUser);

localStorage.setItem("users", JSON.stringify(users));

message.style.color = "green";
message.innerText = "Account created successfully";

setTimeout(()=>{
window.location.href = "login.html";
},1500);

});

}


/* ---------- LOGIN ---------- */

const loginForm = document.getElementById("loginForm");

if(loginForm){

loginForm.addEventListener("submit", function(e){

e.preventDefault();

document.getElementById("loginMessage").innerText = "";

const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value.trim();

let users = JSON.parse(localStorage.getItem("users")) || [];

const user = users.find(
u => u.email === email && u.password === password
);

if(user){
    localStorage.setItem("currentUser", JSON.stringify(user));
    localStorage.removeItem("viewedUser");
    window.location.href = "feed.html";
}else{

document.getElementById("loginMessage").innerText =
"Invalid email or password";

}

});

}
