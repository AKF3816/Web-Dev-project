const feed = document.getElementById("posts");
let posts = JSON.parse(localStorage.getItem("posts")) || [];
function displayPosts(){
    feed.innerHTML = "";
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const filteredPosts = posts.filter(post => {
        const postUser = users.find(u => u.username === post.username);
        return postUser && (currentUser.following.includes(postUser.id) || post.username === currentUser.username);
    });
    // If there are not any posts.
    if(filteredPosts.length === 0){
        feed.innerHTML = "<p>No posts to display. Follow users to see their posts!</p>";
        return;
    }
    filteredPosts.forEach(post => {
        const postFigure = document.createElement("figure");
        postFigure.classList.add("Post-box");
        const isLiked = post.likes.includes(currentUser.id);
        postFigure.innerHTML = `
            <h2 onclick="viewProfile('${post.username}')" style="cursor:pointer;">${post.username}</h2>
            <p>${post.content}</p>
            <p class="timeStamp">${post.timestamp}</p>
            <button onclick="toggleLike(${post.id})" class="like-btn">${isLiked ? 'Unlike' : 'Like'} (${post.likes.length})</button>
            <button onclick="viewPostDetails(${post.id})" class="view-btn">View Details (${post.comments.length} comments)</button>
            ${post.username === currentUser.username ? 
            `<button onclick="deletePosts(${post.id})" class="delete-btn">Delete</button>` 
    : ""}
        `;
feed.appendChild(postFigure);
    })
}
const pstButton = document.getElementById("pstButton");
pstButton.addEventListener("click",createPost);
function createPost(){
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const time = new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString();
    const pstInput = document.getElementById("postText");
    const content = pstInput.value.trim();
    if (content === ""){
        return;
    }
    const username = currentUser ? currentUser.username : "Guest";
posts.unshift({
    username: username,
    content: content,
    timestamp: time,
    id:Date.now(),
    likes: [],
    comments: []

});
localStorage.setItem("posts",JSON.stringify(posts));
pstInput.value="";
displayPosts();
}
function deletePosts(postId){
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const username = currentUser ? currentUser.username : "Guest";
    posts = posts.filter(post=> {
        return !(post.id === postId && post.username == username)
    })
    /*if (currentUser === posts.username){
        let i=0;
        while(posts.id != JSON.parse(localStorage.getItem("id"))){
            i++;
            if (posts.id == JSON.parse(localStorage.getItem("id"))){
                posts.splice(i-1,1);
            }
        }
    }*/
    localStorage.setItem("posts",JSON.stringify(posts));
    displayPosts();
}
function viewProfile(username){
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.username === username);
    if(user){
        localStorage.setItem("viewedUser", JSON.stringify(user));
        window.location.href = "profile.html";
    } else {
        console.log("User not found");
    }
}

function goToMyProfile(){
    localStorage.removeItem("viewedUser");
    window.location.href = "profile.html";
}

function toggleLike(postId){
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;  
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    const index = post.likes.indexOf(currentUser.id);
    if (index > -1) {
        post.likes.splice(index, 1); 
    } else {
        post.likes.push(currentUser.id);  
    }
    localStorage.setItem("posts", JSON.stringify(posts));
    displayPosts();
}

function addComment(postId){
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) return;  
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    const commentInput = document.querySelector(`.comment-input[data-post-id="${postId}"]`);
    const content = commentInput.value.trim();
    if (content === "") return;
    const time = new Date().toLocaleTimeString() + " " + new Date().toLocaleDateString();
    post.comments.push({
        username: currentUser.username,
        content: content,
        timestamp: time
    });
    localStorage.setItem("posts", JSON.stringify(posts));
    commentInput.value = "";
    displayPosts();
}

function viewPostDetails(postId){
    localStorage.setItem("viewedPostId", postId);
    window.location.href = "post.html";
}

displayPosts();
