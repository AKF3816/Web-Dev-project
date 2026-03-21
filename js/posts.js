const feed = document.getElementById("posts");
let posts = JSON.parse(localStorage.getItem("posts")) || [];
function displayPosts(){
    feed.innerHTML="";
    posts.forEach(post => {
        const postFigure = document.createElement("Figure");
        postFigure.classList.add("Post-box");
        postFigure.innerHTML = `
        <h2>${post.username}</h2>
        <p>${post.content}</p>
        <p class="timeStamp">${post.timestamp}</p>
        <button onclick="deletePosts(${post.id})">Delete</button>
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
    id:Date.now()
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
displayPosts();
