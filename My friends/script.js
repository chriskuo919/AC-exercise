const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users/'
const userList = []
const cardContainer = document.querySelector('#user-container')

function renderUserCards() {
  let HTMLContent = ''

  userList.forEach(user => {
    HTMLContent += `
      <div class="card m-2" data-bs-toggle="modal" data-bs-target="#user-modal">
        <img class="card-img-top" src="${user.avatar}" alt="Card image cap" data-modal-user-id="${user.id}">
        <div class="card-body" data-modal-user-id="${user.id}">
          <h5 class="card-title mb-0" data-modal-user-id="${user.id}">${user.name} ${user.surname}</h5>
        </div>
      </div>
    `
  })

  cardContainer.innerHTML = HTMLContent
}

function showMoreUserInfo(event) {
  const id = event.target.dataset.modalUserId
  if (!id) {
    return
  }

  const modalTitleBox = document.querySelector('.modal-title')
  const modalAvatarBox = document.querySelector('.modal-avatar')
  const modalUserInfoBox = document.querySelector('.modal-user-info')

  // 先將 modal 內容清空，以免出現上一個 user 的資料殘影
  modalTitleBox.textContent = ''
  modalAvatarBox.src = ''
  modalUserInfoBox.textContent = ''

  axios
    .get(INDEX_URL + id)
    .then(response => {
      const user = response.data
      modalTitleBox.textContent = user.name + ' ' + user.surname
      modalAvatarBox.src = user.avatar
      modalUserInfoBox.innerHTML = `
      <p>email: ${user.email}</p>
      <p>gender: ${user.gender}</p>
      <p>age: ${user.age}</p>
      <p>region: ${user.region}</p>
      <p>birthday: ${user.birthday}</p>`
    })
    .catch(error => console.log(error))
}

function renderAllUsers() {
  axios
    .get(INDEX_URL)
    .then(response => {
      userList.push(...response.data.results)
      renderUserCards()
    })
    .catch(error => console.log(error))
}

cardContainer.addEventListener('click', showMoreUserInfo)
renderAllUsers()