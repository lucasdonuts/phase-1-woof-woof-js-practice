// After getting it to work, go back and try a new method.
// New method renders all dogs on page load, with display set to hidden.
// When dog is selected, unhide that dog's info card.

document.addEventListener('DOMContentLoaded', () => {
  // Constant declarations
  const baseUrl = 'http://localhost:3000/pups';
  const dogBar = document.querySelector('#dog-bar');
  const dogInfo = document.querySelector('#dog-info');

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
    .then(data => console.log(data))
  }

  // Render functions
  function fillDogBar(pupsArray) {
    pupsArray.forEach(pup => {
      const span = document.createElement('span');

      span.textContent = pup.name;

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

    img.src = dogObj.image;
    img.id = 'dog-img';
    name.textContent = dogObj.name;
    button.textContent = dogObj.isGoodDog ? 'Good Dog!' : 'Bad Dog!';

    button.addEventListener('click', () => {
      button.textContent = dogObj.isGoodDog ? 'Bad Dog!' : 'Good Dog!';
      dogObj.isGoodDog = !dogObj.isGoodDog;

      updateDog(dogObj);
    })

    dogInfo.append(img, name, button);
  }

  // Load page content
  fetchPups()
    .then(pups => fillDogBar(pups));
})