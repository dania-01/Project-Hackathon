export function attachHandlers() {
    
  const memesContainer = document.getElementById("memes-container");

  memesContainer.addEventListener("click", async (event) => {
    const target = event.target;
    const meme = target.closest(".meme");
    const footer = target.closest(".meme-footer");

    if (!meme || !footer) return;

    if (target.classList.contains("upVote")) {
      if (!meme.dataset.voted) {
        const votes = footer.querySelector(".stats span:nth-child(2)");
        const current = parseInt(votes.textContent.split(" ")[0]);
        votes.textContent = `${current + 1} votes`;
        meme.dataset.voted = true;
      }
    }

    if (target.classList.contains("downVote")) {
      Swal.fire("Downvoted!", "You downvoted this meme.", "warning");
    }

    if (target.classList.contains("commentBtn")) {
      let commentSection = footer.querySelector(".comment-section");
      if (!commentSection) {
        commentSection = document.createElement("div");
        commentSection.className = "comment-section mt-2";
        commentSection.innerHTML = `
          <input type='text' class='form-control comment-input mb-2' placeholder='Write a comment...'>
          <button class='btn btn-sm btn-info comment-submit mb-2'>Submit</button>
          <div class='comments'></div>
        `;
        footer.appendChild(commentSection);
      }

      const submitBtn = commentSection.querySelector(".comment-submit");
      submitBtn.onclick = () => {
        const input = commentSection.querySelector(".comment-input");
        const commentText = input.value.trim();
        if (commentText) {
          const commentsDiv = commentSection.querySelector(".comments");
          const commentDiv = document.createElement("div");
          commentDiv.textContent = commentText;
          commentsDiv.appendChild(commentDiv);

          const commentsCount = footer.querySelector(".stats span:nth-child(3)");
          commentsCount.textContent = `${commentsDiv.children.length} comments`;

          input.value = "";
        }
      };
    }

    if (target.classList.contains("shareBtn")) {
      await navigator.clipboard.writeText(window.location.href);
      Swal.fire("Copied!", "Link copied to clipboard!", "success");
    }

    if (target.classList.contains("reportBtn")) {
      Swal.fire("Reported!", "Meme reported. Thank you.", "info");
    }
  });

  setInterval(() => {
    document.querySelectorAll(".stats span:first-child").forEach((viewEl) => {
      const current = parseInt(viewEl.textContent.split(" ")[0]);
      viewEl.textContent = `${current + Math.floor(Math.random() * 5 + 1)} views`;
    });
  }, 3000);
}

export async function loadMemes() {
  const memesContainer = document.getElementById("memes-container");
  const subreddits = ["memes", "dankmemes", "funny"];

  for (let i = 0; i < 10; i++) {
    const subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
    const res = await fetch(`https://meme-api.com/gimme/${subreddit}`);
    const data = await res.json();

    const meme = document.createElement("div");
    meme.className = "col-md-6 meme";
    meme.innerHTML = `
      <div class="card meme-footer">
        <img src="${data.url}" class="card-img-top" />
        <div class="card-body">
          <h5>${data.title}</h5>
          <span class="badge bg-info text-dark">#${subreddit}</span>
          <div class="stats mt-2 mb-2">
            <span>123 views</span>
            <span>0 votes</span>
            <span>0 comments</span>
          </div>
          <div class="buttons d-flex flex-wrap gap-2">
            <button class="btn btn-sm btn-success upVote">👍 Upvote</button>
            <button class="btn btn-sm btn-secondary downVote">👎 Downvote</button>
            <button class="btn btn-sm btn-primary commentBtn">💬 Comment</button>
            <button class="btn btn-sm btn-warning shareBtn">🔗 Share</button>
            <button class="btn btn-sm btn-danger reportBtn">⚠️ Report</button>
          </div>
        </div>
      </div>
    `;
    memesContainer.appendChild(meme);
  }

  attachHandlers();
}

window.addEventListener("DOMContentLoaded", () => {
  loadMemes();
})