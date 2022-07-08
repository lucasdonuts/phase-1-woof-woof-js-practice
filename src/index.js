document.addEventListener('DOMContentLoaded', () => {
  // Constant declarations
  const baseUrl = 'http://localhost:3000/pups';
  const dogBar = document.querySelector('#dog-bar');
  const dogInfo = document.querySelector('#dog-info');
  console.log(dogInfo);

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
    
  }

  fetchPups()
    .then(pups => fillDogBar(pups));
})