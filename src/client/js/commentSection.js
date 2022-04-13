const videoContainer = document.getElementById("videoContainer");
const form = document.getElementById("commentForm");
const delBtn = document.getElementById("deleteBtn");
const delBtns = document.querySelectorAll("#deleteBtn");

const addComment = (text, id) => {
  const videoComments = document.querySelector(".video__comments ul");
  const newComment = document.createElement("li");
  newComment.dataset.id = id;
  newComment.className = "video__comment";
  const div1 = document.createElement("div");
  const icon = document.createElement("i");
  icon.className = "fas fa-comment";
  const span = document.createElement("span");
  span.innerText = `${text}`;
  const div2 = document.createElement("div");
  div2.className = "video__delete-comment";
  div2.id = "del";
  const button = document.createElement("button");
  button.id = "deleteBtn";
  button.innerText = "❌";
  newComment.appendChild(div1);
  div1.appendChild(icon);
  div1.appendChild(span);
  newComment.appendChild(div2);
  div2.append(button);
  videoComments.prepend(newComment);
};

const handleSubmit = async (event) => {
  event.preventDefault();
  const textarea = form.querySelector("textarea");
  const text = textarea.value;
  const videoId = videoContainer.dataset.id;
  if (text === "") {
    return;
  }
  const response = await fetch(`/api/videos/${videoId}/comment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (response.status === 201) {
    textarea.value = "";
    const { newCommentId } = await response.json();
    addComment(text, newCommentId);
  }
};

const handleDelBtn = async (e) => {
  let targetComment = e.target.parentElement.parentElement;
  let commentId = targetComment.dataset.id;
  let response = await fetch(`/api/comments/${commentId}/delete`, {
    method: "DELETE",
  });
  if (response.status === 204) {
    targetComment.style.display = "none";
  }
  return;
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}

if (delBtns) {
  delBtns.forEach((e) => {
    e.addEventListener("click", (e) => handleDelBtn(e));
  });
}

// 딜리트 여러번되도록 // 방금만들어진 코멘트 바로 삭제 되도록!
