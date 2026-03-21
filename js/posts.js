const feed = document.getElementById("posts");
let posts = JSON.parse(localStorage.getItem("posts")) || [];
function displayPosts(){
    feed.innerHTML="";
    posts.forEach(posts => {
        const postFigure = document.createElement("Figure");
        postFigure.classList.add("Post-box");
        postFigure.innerHTML = `
        <h2>${posts.username}</h2>
        <p>${posts.content}</p>
        <p class="timeStamp">${posts.timestamp}</p>
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
posts.push({
    username: username,
    content: content,
    timestamp: time
});
localStorage.setItem("posts",JSON.stringify(posts));
pstInput.value="";
displayPosts();
}
displayPosts();
