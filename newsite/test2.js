// useful links
// https://anilist.github.io/ApiV2-GraphQL-Docs/
// https://anilist.gitbook.io/anilist-apiv2-docs/overview/rate-limiting
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise




// to do:
// 1 - edit code so that it either uses just anilist ids to make sure the animes are correct or just make it accept both anilist and mal 
// 2 - have it store already opened lists so as to not make too many api requests
// 3 - fix the completed button
// 4 - add a less detailed mode
// 5 - add swiping between days


const malIds = {
  sunday: [
    // if i ever cba i can change to {name : id}
    // database? https://firebase.google.com/docs/reference/rest/database cool stuff 🫣
    { a1: 46569 },
    { a2: 51105 },
    { a3: 50002 },
    { a4: 48417 },
    { a5: 53126 },
    { a6: 21 },
    { a7: 50220 },
    { a8: 51705 },
    { a9: 52578 },
    { a10: 51614 },
    { a11: 53199 },
    { a12: 53621 },
    { a13: 52608 }
  ],
  monday: [
    { a1: 44248 },
    // { a2 : 44924 }, this anime doesnt appear in anilist due to anilist and mal naming them differently maybe?
    { a3: 52092 },
    { a4: 51940 },
    { a5: 53698 },
    { a6: 51019 },
    { a7: 50871 },
    { a8: 52308 },
    { a9: 45486 }
  ],
  tuesday: [
    { a1: 50528 },
    { a2: 53613 },
    { a3: 51632 },
    { a4: 50796 },
    { a5: 50010 },
    { a6: 49387 },
    { a7: 50606 },
    { a8: 51139 }
  ],
  wednesday: [
    { a1: 51815 },
    { a2: 50416 },
    { a3: 53097 },
    // { a4 : 53857 }, this is meant to be THE MARGINAL SERVICE not whatever this is
    { a5: 50429 },
    { a6: 54738 }
  ],
  thursday: [
    { a1: 52034 },
    { a2: 46422 },
    { a3: 51958 },
    { a4: 51693 },
    { a5: 51817 },
    { a6: 48549 }
  ],
  friday: [
    { a1: 52955 },
    { a2: 52830 },
    { a3: 51415 },
    { a4: 51706 },
    { a5: 52657 },
    { a6: 53876 },
    { a7: 51219 }
  ],
  saturday: [
    { a1: 53163 },
    { a2: 52211 },
    { a3: 50307 },
    { a4: 54259 },
    { a5: 52973 },
    { a6: 52081 },
    { a7: 52229 },
    { a8: 48981 },
    { a9: 235 },
    { a10: 53393 }
  ]
};


var today = new Date();
var dayOfWeek = today.getDay();
const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
var currentDayOfWeek = daysOfWeek[dayOfWeek];



const schedButtons = document.querySelectorAll('.schedButtons');
const animeParent = document.getElementById('animeParent');
const compCheckbox = document.getElementById('comp-checkbox');


var hidden = "False"

function hide(){
  const hideAnime = animeParent.querySelectorAll('.NOT_YET_RELEASED, .CANCELLED, .RELEASING, .HIATUS');
  for (let i = 0; i < hideAnime.length; i++) {
    if (compCheckbox.checked) {
      hideAnime[i].classList.add('hidden');
    } else {
      hideAnime[i].classList.remove('hidden');
    }
    console.log("hmmmmm")
  }
}

compCheckbox.addEventListener('change', () => {
  hide()
  hidden = "True"
});


function fetchAnimeDetailsForDay(day) {

  const dayMalIds = malIds[day];

  if (!dayMalIds) {
    console.error(day);
    return Promise.reject('err', day);
  }

  const promises = dayMalIds.map(malIdObj => {
    const malId = Object.values(malIdObj)[0];
    return getAnimeDetails(malId);
  });

  return Promise.all(promises);
}



function getAnimeDetails(malId) {
  const url = 'https://graphql.anilist.co';

  const query = `
    query ($malId: Int) {
      Media(idMal: $malId, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        status
        description
        coverImage {
          medium
          color
        }
      }
    }
  `;

  // colour query gives average colour of image 
  // - cool gradient design? like half faded image into gradient 
  // - or just of the background for the detils maybe 
  // - or smth like yt ambient mode?

  const variables = {
    malId: malId
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      query: query,
      variables: variables
    })
  };

  return fetch(url, options)
    .then(response => response.json())
    .then(data => {
      const anime = data.data.Media;
      return anime;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


function handleButtonClick(event) {
  schedButtons.forEach(button => {
    button.classList.remove('active');
  });
  event.target.classList.add('active');
  const dataId = event.target.getAttribute('data-id');
  const animeDayWeWant = document.getElementById(dataId);

  for (const day of daysOfWeek) {
    const resetWeek = document.getElementById(day);
    if (resetWeek) {
      resetWeek.classList.add('hidden');
    }
  }

  animeDayWeWant.classList.remove('hidden');
  const DOWHistory = animeDayWeWant.getAttribute('data-history')
  if (DOWHistory != 'called') {
    // make a new API call for the when day butt clicked to prev the ratelimiting from test1.js
    // read up on cacheing?
    fetchAnimeDetailsForDay(dataId)
      .then(animeDetails => {
        const dayOfWeekElement = document.getElementById(dataId);

        dayOfWeekElement.setAttribute('data-history', 'called');

        animeDetails.forEach(anime => {

          const animeInfo = document.createElement('div');
          animeInfo.classList.add('anime-card');
          animeInfo.classList.add(anime.status);

          const animeImg = document.createElement('img');
          animeImg.classList.add('anime-img');
          animeImg.src = anime.coverImage.medium;
          animeInfo.appendChild(animeImg);

          const animeRightSide = document.createElement('div')
          animeRightSide.classList.add("anime-card-R")
          animeInfo.append(animeRightSide)

          const animeTitle = document.createElement('div');
          animeTitle.classList.add('anime-title')
          animeRightSide.appendChild(animeTitle);
          const animeTitleRomanji = document.createElement('h3');
          animeTitleRomanji.textContent = anime.title.romaji
          animeTitle.appendChild(animeTitleRomanji);
          const animeTitleNatEng = document.createElement('h5');
          animeTitleNatEng.classList.add('anime-title-nat-eng');
          const titleNative = anime.title.native ?? "";
          const titleEnglish = anime.title.english ?? "";
          animeTitleNatEng.textContent = titleNative !== titleEnglish ? `${titleNative} ${titleEnglish}` : titleNative;
          animeTitle.appendChild(animeTitleNatEng);
          animeTitle.setAttribute('onclick', `window.location.href = "https://anilist.co/anime/${anime.id}"`);

          const animeDescription = document.createElement('p');
          animeDescription.classList.add('anime-description');
          animeDescription.innerHTML = anime.description.replace(/<br>|<i>/g, '');
          animeRightSide.appendChild(animeDescription);

          dayOfWeekElement.appendChild(animeInfo);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  if (hidden = "True"){
    console.log ("hmm")
    hide()
  }
}


schedButtons.forEach(button => {
  button.addEventListener('click', handleButtonClick);
});

// this bit gets todays details for when page loaded
fetchAnimeDetailsForDay(currentDayOfWeek)
  .then(animeDetails => {
    const dayOfWeekElement = document.getElementById(currentDayOfWeek);

    schedButtons.forEach(button => {
      const dataId = button.getAttribute('data-id');
      if (dataId == currentDayOfWeek) {
        button.classList.add('active');
      }
    });

    dayOfWeekElement.setAttribute('data-history', 'called');

    animeDetails.forEach(anime => {

      const animeInfo = document.createElement('div');
      animeInfo.classList.add('anime-card');
      animeInfo.classList.add(anime.status);

      const animeImg = document.createElement('img');
      animeImg.classList.add('anime-img');
      animeImg.src = anime.coverImage.medium;
      animeInfo.appendChild(animeImg);

      const animeRightSide = document.createElement('div')
      animeRightSide.classList.add("anime-card-R")
      animeInfo.append(animeRightSide)

      const animeTitle = document.createElement('div');
      animeTitle.classList.add('anime-title')
      animeRightSide.appendChild(animeTitle);
      const animeTitleRomanji = document.createElement('h3');
      animeTitleRomanji.textContent = anime.title.romaji
      animeTitle.appendChild(animeTitleRomanji);
      const animeTitleNatEng = document.createElement('h5');
      animeTitleNatEng.classList.add('anime-title-nat-eng');
      const titleNative = anime.title.native ?? "";
      const titleEnglish = anime.title.english ?? "";
      animeTitleNatEng.textContent = titleNative !== titleEnglish ? `${titleNative} ${titleEnglish}` : titleNative;
      animeTitle.appendChild(animeTitleNatEng);
      animeTitle.setAttribute('onclick', `window.location.href = "https://anilist.co/anime/${anime.id}"`);

      const animeDescription = document.createElement('p');
      animeDescription.classList.add('anime-description');
      animeDescription.innerHTML = anime.description.replace(/<br>|<i>/g, '');
      animeRightSide.appendChild(animeDescription);

      dayOfWeekElement.appendChild(animeInfo);

    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
