console.log("github wrapper madhu");

const usernameinp = document.getElementById("userName");
const showdetbtn = document.getElementById("showDetails");
const profileInfoDiv = document.getElementById("profileInfo");
const reposInfoDiv = document.getElementById("reposInfo");

showdetbtn.addEventListener("click", async () => {
  const username = usernameinp.value;

  const res = await fetch(`https://api.github.com/users/${username}`);
  const data = await res.json();
  showProfile(data);
  showReposInfo(username);
});

function showProfile(data) {
  profileInfoDiv.innerHTML = `<div class="card">
        <div class="card-img">
            <img src=${data.avatar_url} alt=${data.name}>
        </div>
        <div class="card-body">
            <div class="card-title">${data.name}</div>
            <div class="card-subHeading">@${data.login}</div>
            <div class="card-text">
                <p>${data.bio}</p>
                <p>${data.followers} followers ${data.following} following

                <button>
                        <a href=${data.html_url}>
                            Do checkout Profile
                        </a>
                </button>
            </div>
        </div>
    </div>`;
}

async function showReposInfo(username) {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  const projects = await res.json();

  for (let i = 0; i < projects.length; i++) {
    reposInfoDiv.innerHTML += `<div class="card">
                <div class="card-body">
                    <div class="card-title">${projects[i].name}</div>
                    <div class="card-subHeading">${projects[i].language}</div>
                    <div class="card-text">
                        <button>
                            <a href=${projects[i].html_url}>
                                Do checkout Project
                            </a>
                        </button>
                    </div>
                </div>
            </div>`;
  }
}
