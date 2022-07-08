document.addEventListener('DOMContentLoaded', () => {
  // Constant declarations
  const baseUrl = 'http://localhost:3000/pups';
  const dogBar = document.querySelector('#dog-bar');
  const dogInfo = document.querySelector('#dog-info');

  //Fetch pup data function
  function fetchPups() {
    return fetch(baseUrl)
    .then(res => res.json())
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
    // img
    // name h2
    // good dog button
    const img = document.createElement('img');
    const name = document.createElement('h2');
    const button = document.createElement('button');

    img.src = dogObj.image;
    img.id = 'dog-img';
    name.textContent = dogObj.name;
    button.textContent = dogObj.isGoodDog ? 'Good Dog!' : 'Bad Dog!';

    button.addEventListener('click', () => {
      
    })
  }

  fetchPups()
    .then(pups => fillDogBar(pups));
})