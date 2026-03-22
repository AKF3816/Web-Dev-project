const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const viewedUser = JSON.parse(localStorage.getItem("viewedUser")) || currentUser;

// redirect if not logged in
if (!currentUser) {
    window.location.href = "login.html";
}

document.getElementById("title").textContent = `${viewedUser.username}'s Followers`;

const users = JSON.parse(localStorage.getItem("users")) || [];
const followers = users.filter(user => user.following.includes(viewedUser.id));

const list = document.getElementById("userList");
followers.forEach(user => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="#" onclick="viewProfile('${user.username}')">${user.username}</a>`;
    list.appendChild(li);
});

function viewProfile(username) {
    const user = users.find(u => u.username === username);
    if (user) {
        localStorage.setItem("viewedUser", JSON.stringify(user));
        window.location.href = "profile.html";
    }
}