const editBtn = document.getElementById("editBtn");
const modalOverlay = document.getElementById("modalOverlay");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");

if (currentUser.id !== viewedUser.id) {
    editBtn.style.display = "none";
}

editBtn.addEventListener("click", () => {
    document.getElementById("editEmail").value = currentUser.email || "";
    document.getElementById("editBio").value = currentUser.bio || "";
    modalOverlay.classList.add("open");
});

cancelBtn.addEventListener("click", () => {
    modalOverlay.classList.remove("open");
});

saveBtn.addEventListener("click", () => {
    const newEmail = document.getElementById("editEmail").value.trim();
    const newBio = document.getElementById("editBio").value.trim();

    if (newEmail) currentUser.email = newEmail;
    currentUser.bio = newBio;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map(u => u.id === currentUser.id ? currentUser : u);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));

    document.getElementById("email").textContent = currentUser.email;
    document.getElementById("bio").textContent = currentUser.bio;

    modalOverlay.classList.remove("open");
});