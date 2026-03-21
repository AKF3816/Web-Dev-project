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
const pstButton = document.getElementById("pstButton");
pstButton.addEventListener("click",createPost)
function createPost(){
    const time = new Date().toLocaleDateString();
    const pstInput = document.getElementById("postText");
    const content = pstInput.value.trim();
    if (content === ""){
        return;
    }
posts.push({
    username: String(profile.username),
    content: content,
    timestamp: time
})
pstInput.value="";
displayPosts();
}
posts.push({
    username: "ahmed",
    content: "giggity",
    timestamp: "Now"
});
posts.push({
    username: "ahmed",
    content: "giggity",
    timestamp: "Now"
});
posts.push({
    username: "ahmed",
    content: "ujrnewbiouvbgnewiuabnj rvieaur nvbigqwsvd bqerbvqierenu vbuqrejen gviquwwb vireqjbnguiqeron eruger nerjgerjnviuerjubnerjnviurfejnvbqeriunv iqe qier nbqi  eunvqfvneqrir vqeirj nnqeroiu b qef qeibjnv qei neqroiu n   qeiuV ER ERO IQNE  UERQ QOEUI VBNQ ",
    timestamp: "Now"
});
posts.push({
    username: "ahmed",
    content: "giggity",
    timestamp: "Now"
});
posts.push({
    username: "ahmed",
    content: "giggity",
    timestamp: "Now"
});
posts.push({
    username: "ahmed",
    content: "giggity",
    timestamp: "Now"
});
posts.push({
    username: "ahmed",
    content: "giggity",
    timestamp: "Now"
});
displayPosts();
