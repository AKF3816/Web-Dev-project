const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const viewedUser = JSON.parse(localStorage.getItem("viewedUser")) || currentUser;

if (!currentUser) {
    window.location.href = "login.html";
}

document.getElementById("username").textContent = viewedUser.username;
document.getElementById("email").textContent = viewedUser.email;
document.getElementById("avatarInitial").textContent = viewedUser.username[0].toUpperCase();
document.getElementById("bio").textContent = viewedUser.bio || "";
const users = JSON.parse(localStorage.getItem("users")) || [];
const viewedUserFull = users.find(u => u.id === viewedUser.id) || viewedUser;

const followers = users.filter(u => u.following && u.following.includes(viewedUser.id));
const following = viewedUserFull.following ? viewedUserFull.following.length : 0;

document.getElementById("followersCount").textContent = followers.length;
document.getElementById("followingCount").textContent = following;

const posts = JSON.parse(localStorage.getItem("posts")) || [];
const container = document.getElementById("userPosts");
const userPosts = posts.filter(post => post.username === viewedUser.username);

userPosts.forEach(post => {
    const postDiv = document.createElement("figure");
    postDiv.innerHTML = `
        <h2>${post.username}</h2>
        <p>${post.content}</p>
        <p class="timeStamp">${post.timestamp}</p>`;
    container.appendChild(postDiv);
});

function goToMyProfile() {
    localStorage.removeItem("viewedUser");
}

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
            document.getElementById("followersCount").textContent = followers.length + 1;
        } else {
            currentUser.following = currentUser.following.filter(id => id !== viewedUser.id);
            followBtn.textContent = "Follow";
            document.getElementById("followersCount").textContent = followers.length;
        }

        const updatedUsers = users.map(user =>
            user.id === currentUser.id ? currentUser : user
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    });
}

function viewFollowers() {
    localStorage.setItem("viewedUser", JSON.stringify(viewedUser));
    window.location.href = "followers.html";
}

function viewFollowing() {
    localStorage.setItem("viewedUser", JSON.stringify(viewedUser));
    window.location.href = "following.html";
}