const app = document.querySelector("#app");
const input = document.createElement('input');
input.setAttribute("type", "text");
app.appendChild(input);
const ol = document.createElement('ol');
app.appendChild(ol);
const result = document.querySelector('ol');
input.addEventListener('keyup', (event) => {
  const search = event.target.value;
  fetch(`https://itunes.apple.com/search?term=${search}&entity=song`)
    .then((response) => {
      const h1 = document.createElement("h1");
      h1.innerText = "Processing Request;";
      document.body.appendChild(h1);
      return response.json()
    })
    .then(data => {
      const h1 = document.querySelector("h1");
      h1.remove();
      result.innerHTML = '';

      for (let i = 0; i < data.results.length; i++) {
        const song = data.results[i];
        const itemElement = document.createElement('li');

        itemElement.innerText = song.trackName;
        result.appendChild(itemElement);
      }
    })
    .catch((error) => {
      alert('O ne, nešto je pošlo naopako!')
    });
});