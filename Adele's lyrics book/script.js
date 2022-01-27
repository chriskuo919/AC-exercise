// DEFAULT CODE ////////////////////////
const BASE_URL = 'https://lyric-api-403c0.firebaseio.com/'
const songList = document.querySelector('#song-list')
const lyricsPanel = document.querySelector('#lyrics-panel')
const album = {
  artist: 'Adele',
  album: '25',
  tracks: [
    'Hello',
    'Send My Love (To Your New Lover)',
    'I Miss You',
    'When We Were Young',
    'Remedy',
    'Water Under the Bridge',
    'River Lea',
    'Love in the Dark',
    'Million Years Ago',
    'All I Ask',
    'Sweetest Devotion'
  ]
}

// WRITE YOUR CODE ////////////////////////
let navHtml = ''
for (const song of album.tracks) {
  navHtml += `
      <li>
        <a class="nav-link" href="#" role="tab">${song}</a>
      </li>`
}
songList.innerHTML = navHtml

songList.addEventListener('click', event => {
  const activeItem = document.querySelector('#song-list .active')
  if (activeItem) {
    activeItem.classList.remove('active')
  }
  if (event.target.matches('.nav-link')) {
    event.target.classList.add('active')
    const song = event.target.innerText
    axios.get(`${BASE_URL}Adele/${song}.json`)
      .then(response => {
        const lyrics = response.data.lyrics
        lyricsPanel.innerHTML = `
          <h3>${song}</h3>
          <pre>${lyrics}</pre>
          `
      })
      .catch(error => console.log(error))
  }
})