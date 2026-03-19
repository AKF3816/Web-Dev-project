const feed = document.getElementById("posts")
const posts =[]
function displayPosts(){
    feed.innerHTML="";
    posts.forEach(posts => {
        const postFigure = document.createElement("Figure");
        postFigure.classList.add("Post-box");
        postFigure.innerHTML = `
        <h2>${posts.username}</h2>
        <p>${posts.content}</p>
        <p class="timeStap">${posts.timestamp}</p>
        `;
feed.appendChild(postFigure)
    })
}
posts.push({
    username: "ahmed",
    content: "giggity",
    timestamp: "Now"
});
displayPosts();
