const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const viewedUser = JSON.parse(localStorage.getItem("viewedUser")) || currentUser;

// redirect if not logged in
if (!currentUser) {
    window.location.href = "login.html";
}
document.getElementById("username").textContent = viewedUser.username;
document.getElementById("email").textContent = viewedUser.email;
const posts = JSON.parse(localStorage.getItem("posts")) || [];
const container = document.getElementById("userPosts");
const userPosts = posts.filter(post => post.username === viewedUser.username);
userPosts.forEach(post => {
    const postDiv = document.createElement("figure");
    postDiv.innerHTML = `
    <h2>${post.username}</h2>
    <p>${post.content}</p>
    <p>${post.timestamp}</p>`;
    container.appendChild(postDiv);
});
// users list
const users = JSON.parse(localStorage.getItem("users")) || [];
const followBtn = document.getElementById("followBtn");
if (currentUser.id === viewedUser.id) {
    followBtn.style.display = "none";
} else {
    if (currentUser.following.includes(viewedUser.id)) {
        followBtn.textContent = "Unfollow";
    } else {
        followBtn.textContent = "Follow";
    }
    followBtn.addEventListener("click", () => {
        if (!currentUser.following.includes(viewedUser.id)) {
            currentUser.following.push(viewedUser.id);
            followBtn.textContent = "Unfollow";
        } else {
            currentUser.following = currentUser.following.filter(id => id !== viewedUser.id);
            followBtn.textContent = "Follow";
        }
        const updatedUsers = users.map(user =>
            user.id === currentUser.id ? currentUser : user
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    });
}