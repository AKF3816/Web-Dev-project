const postId = JSON.parse(localStorage.getItem("viewedPostId"));
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
let posts = JSON.parse(localStorage.getItem("posts")) || [];

if (!currentUser) {
    window.location.href = "login.html";
}

const post = posts.find(p => p.id === postId);
if (!post) {
    document.getElementById("postDetails").innerHTML = "<p>Post not found.</p>";
} else {
    displayPostDetails();
}

function displayPostDetails() {
    const container = document.getElementById("postDetails");
    const isLiked = post.likes.includes(currentUser.id);
    container.innerHTML = `
        <h2 onclick="viewProfile('${post.username}')" style="cursor:pointer;">${post.username}</h2>
        <p>${post.content}</p>
        <p class="timeStamp">${post.timestamp}</p>
        <button onclick="toggleLike(${post.id})" class="like-btn">${isLiked ? 'Unlike' : 'Like'} (${post.likes.length})</button>
        <div class="comments-section">
            <input type="text" placeholder="Add a comment..." class="comment-input" id="commentInput">
            <button onclick="addComment()" class="comment-btn">Comment</button>
            <div class="comments-list">
                ${post.comments.map(comment => `<p><strong>${comment.username}:</strong> ${comment.content} <small>${comment.timestamp}</small></p>`).join('')}
            </div>
        </div>
        ${post.username === currentUser.username ? `<button onclick="deletePost()">Delete Post</button>` : ''}
    `;
}

function toggleLike(postId) {
    const index = post.likes.indexOf(currentUser.id);
    if (index > -1) {
        post.likes.splice(index, 1);
    } else {
        post.likes.push(currentUser.id);
    }
    localStorage.setItem("posts", JSON.stringify(posts));
    displayPostDetails();
}

function addComment() {
    const content = document.getElementById("commentInput").value.trim();
    if (content === "") return;
    const time = new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString();
    post.comments.push({
        username: currentUser.username,
        content: content,
        timestamp: time
    });
    localStorage.setItem("posts", JSON.stringify(posts));
    document.getElementById("commentInput").value = "";
    displayPostDetails();
}

function deletePost() {
    posts = posts.filter(p => p.id !== postId);
    localStorage.setItem("posts", JSON.stringify(posts));
    window.location.href = "feed.html";
}

function viewProfile(username) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === username);
    if (user) {
        localStorage.setItem("viewedUser", JSON.stringify(user));
        window.location.href = "profile.html";
    }
}