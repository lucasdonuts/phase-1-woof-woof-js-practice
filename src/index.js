// After getting it to work, go back and try a new method.
// New method renders all dogs on page load, with display set to hidden.
// When dog is selected, unhide that dog's info card.

document.addEventListener('DOMContentLoaded', () => {
  // Constant declarations
  const baseUrl = 'http://localhost:3000/pups';
  const dogBar = document.querySelector('#dog-bar');
  const dogInfo = document.querySelector('#dog-info');
  const filterButton = document.querySelector('#good-dog-filter');
  let filterOn = document.querySelector('#filter-status')
                    .textContent == 'ON' ? true : false;

  //Fetch functions
  function fetchPups() {
    return fetch(baseUrl)
    .then(res => res.json())
  }

  function updateDog(dogObj) {
    fetch(baseUrl + `/${dogObj.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(dogObj)
    })
    .then(res => res.json())
  }

  // Render functions
  function fillDogBar(pupsArray) {
    pupsArray.forEach(pup => {
      const span = document.createElement('span');

      span.textContent = pup.name;
      span.className = pup.isGoodDog ? 'good-dog' : 'bad-dog';
      span.id = pup.id;

      span.addEventListener('click', () => {
        renderDogInfo(pup);
      })

      dogBar.append(span);
    });
  }

  function renderDogInfo(dogObj) {
    while (dogInfo.firstChild) {
      dogInfo.firstChild.remove();
    }

    const img = document.createElement('img');
    const name = document.createElement('h2');
    const button = document.createElement('button');
    const span = document.getElementById(`${dogObj.id}`)

    console.log('span before: ', span)
    console.log(dogObj)

    img.src = dogObj.image;
    img.id = 'dog-img';
    name.textContent = dogObj.name;
    button.textContent = dogObj.isGoodDog ? 'Bad Dog!' : 'Good Dog!';

    button.addEventListener('click', () => {
      button.textContent = dogObj.isGoodDog ? 'Bad Dog!' : 'Good Dog!';
      span.className = dogObj.isGoodDog ? 'bad-dog' : 'good-dog';
      dogObj.isGoodDog = !dogObj.isGoodDog;

      console.log('span after: ', span)
      console.log(dogObj);

      updateDog(dogObj);
    })

    dogInfo.append(img, name, button);
  }

  // Load page content
  fetchPups()
    .then(pups => fillDogBar(pups));

  filterButton.addEventListener('click', (e) => {
    const badDogs = dogBar.querySelectorAll('.bad-dog');
    badDogs.forEach(dog => {
      dog.style.visibility = filterOn ? 'visible' : 'hidden';
    })
    filterOn = !filterOn;
  })
})