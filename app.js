const getForm = document.querySelector('form')
const errorMsg = document.querySelector('aside.errormsg')

// getting the search query for the user
getForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const searchQuery = document.querySelector('input[name="username"]').value
  findUser(searchQuery)
})

// sending an ajax request for the searched user
function findUser (username) {
  if (username === '') return errorHandler(username) // error-handling for empty field
  const urlUser = `https://api.github.com/users/${username}`
  fetch(urlUser)
    .then((response) => { // error-handling for bad request
      if (response.ok) return response
      errorHandler(response)
    })
    .then(response => response.json())
    .then(findUserBio)
    .catch((err) => errorHandler(err))
}

// The approach I took is to show the user's bio first so that the client can atleast see something on the page while the request for user's repos is being made (useful if the client's connection is slow)
function findUserBio (user) {
  errorMsg.style.display = 'none'
  const { login, name, avatar_url, bio } = user // Destructuring to get the properties required
  renderUserInfo(login, name, avatar_url, bio)
  findUserRepos(user.login) // now I search for repos after showing user bio on DOM
}

// rendering the user's biography (name, avatar, bio etc)
function renderUserInfo (login, fullName, avatar, bio) {
  document.querySelector('.login').innerHTML = `@ ${login}`
  document.querySelector('.name').innerHTML = fullName
  document.querySelector('img.userimg').src = avatar
  document.querySelector('.bio').innerHTML = bio
}

//  ajax request send with the user's unique login value
function findUserRepos (user) {
  const urlRepos = `https://api.github.com/users/${user}/repos`
  fetch(urlRepos)
    .then(response => response.json())
    .then(renderRepos)
    .catch(err => errorHandler(err))
}

// rendering all repos of the searched user
function renderRepos (userRepos) {
  document.querySelector('.listheading').innerHTML = '<h3>Repositories</h3>'
  if (userRepos.length === 0) document.getElementsById('norepos').innerHTML = '<p>This user has no repositories</p>'
  else document.querySelector('ul.allrepos').innerHTML = renderAllRepos(userRepos)
}

// template string to render array containing all repos as <li> elements
function renderAllRepos (arrRepos) {
  let forkSvgGithub = '<svg aria-label="fork" class="octicon octicon-repo-forked" height="16" role="img" version="1.1" viewBox="0 0 10 16" width="10"><path fill-rule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg>'
  let starSvgGithub = '<svg aria-label="star" class="octicon octicon-star" height="16" role="img" version="1.1" viewBox="0 0 14 16" width="14"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74z"></path></svg>'
  return arrRepos.map(repo =>
    `<li>
      <span>${repo.name}</span>
      <span>${repo.stargazers_count}&nbsp;${starSvgGithub} ${repo.forks_count}&nbsp;${forkSvgGithub}</span>
    </li>` + '\n'
  ).join('')
}

// error handler for non-existant user and bad request
function errorHandler (error) {
  errorMsg.style.display = 'block'
  error !== '' ? errorMsg.innerHTML = '<p>Does not exist</p>' : errorMsg.innerHTML = '<p>Please enter a username</p>'
}
