// Leer mensaje personalizado desde la URL
const urlSearchParams = new URLSearchParams(window.location.search);
const messageCustom = urlSearchParams.get('message');

if (messageCustom) {
  const mainMessageElement = document.querySelector('#mainMessage');
  mainMessageElement.textContent = decodeURI(messageCustom);
}

// Elementos interactivos
const btnOpenElement = document.querySelector('#open');
const btnCloseElement = document.querySelector('#close');

btnCloseElement.disabled = true;

btnOpenElement.addEventListener('click', () => {
  btnOpenElement.disabled = true;
  btnCloseElement.disabled = false;

  const coverElement = document.querySelector('.cover');
  coverElement.classList.add('open-cover');

  setTimeout(() => {
    coverElement.style.zIndex = -1;

    const paperElement = document.querySelector('.paper');
    paperElement.classList.remove('close-paper');
    paperElement.classList.add('open-paper');

    const heartElement = document.querySelector('.heart');
    heartElement.style.display = 'block';
  }, 500);
});

btnCloseElement.addEventListener('click', () => {
  btnOpenElement.disabled = false;
  btnCloseElement.disabled = true;

  const coverElement = document.querySelector('.cover');
  const paperElement = document.querySelector('.paper');
  paperElement.classList.remove('open-paper');
  paperElement.classList.add('close-paper');

  setTimeout(() => {
    coverElement.style.zIndex = 0;
    coverElement.classList.remove('open-cover');

    const heartElement = document.querySelector('.heart');
    heartElement.style.display = 'none';
  }, 500);
});

// Funcionalidad del popup
document.addEventListener('DOMContentLoaded', () => {
  const popup = document.querySelector('#popup');
  const acceptButton = document.querySelector('#accept');
  const denyButton = document.querySelector('#deny');

  acceptButton.addEventListener('click', () => {
    popup.style.display = 'none';
  });

  denyButton.addEventListener('mouseover', () => {
    const randomX = Math.floor(Math.random() * 200) - 100;
    const randomY = Math.floor(Math.random() * 100) - 50;
    denyButton.style.transform = `translate(${randomX}px, ${randomY}px)`;
  });
});

// Función para generar corazones flotantes
function createFloatingHeart() {
  const heartsContainer = document.querySelector('.hearts-container');
  const heart = document.createElement('span');
  
  heart.classList.add('heart-particle');
  heart.innerHTML = '♥';

  // Posición aleatoria en la pantalla
  const randomX = Math.random() * window.innerWidth;
  const randomSize = Math.random() * 1.5 + 1; // Tamaño entre 1 y 2.5
  const randomDuration = Math.random() * 2 + 3; // Duración entre 3s y 5s

  heart.style.left = `${randomX}px`;
  heart.style.fontSize = `${randomSize}rem`;
  heart.style.animationDuration = `${randomDuration}s`;

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, randomDuration * 1000);
}
setInterval(createFloatingHeart, 500);

document.querySelector('.paper').addEventListener('click', (event) => {
  event.stopPropagation(); // Evita que el evento se propague al body

  const largePaper = document.createElement('div');
  largePaper.classList.add('large-paper');
  largePaper.innerHTML = `
    <h1>Feliz San Valentín</h1>
    <p>

Para: Mi amor (María Fernanda Perera Barrera)

Hola amor, te escribo esta carta para decirte lo mucho que te amo y lo feliz que me hace estar otro San Valentín a tu lado. Tal vez no sea la manera más elegante o tal vez "bonita" de expresarlo, pero la hice con mucho cariño para ti, y además es algo un poco diferente a lo habitual.

Quiero agradecerte por todo lo que has hecho por mí y por todo el amor que me has regalado. Durante todo este año, nunca me faltó tu cariño ni tu amor, y por eso este día es tan importante para recordar lo bonito que es tenernos el uno al otro.

Sabes que siempre estaré para ti y que siempre trataré de consentirte lo más que pueda, haciendo todo lo posible por cumplir con lo que te gusta jijiji.

Por eso, y para celebrar nuestro San Valentín No. 6, quiero invitarte a salir hoy. Sé que tienes escuela y sales tarde, pero quiero aprovechar el tiempo o la noche estando contigo.

Pero antes, tengo una pregunta para ti...</p>

<h2>¿Quieres ser mi San Valentín?...</h2>

<p>Con amor: Javier de Jesus Ortiz Miss</p>

    <form id="largePaperForm">
      <label for="userInput">Si tú respuesta es "sí", escribe "Acepto":</label>
      <input type="text" id="userInput" name="userInput" required>
      <button type="submit">Enviar</button>
    </form>
  `;

  document.body.appendChild(largePaper);

  // Manejar el envío del formulario
  const form = document.getElementById('largePaperForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const userInput = document.getElementById('userInput').value.toLowerCase();

    // Enviar correo electrónico usando EmailJS
    emailjs.send("service_ml1ii4m", "template_gc5e29s", {
      message: userInput,
      to_email: "javier.ortiz200512@gmail.com"
    })
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      if (userInput === 'acepto') {
        alert('Gracias por aceptar, te espero en la noche amor, suerte en tus clases<3');
      } else {
        alert('No acepto un no como respuesta');
      }
      largePaper.remove();
    }, (error) => {
      console.log('FAILED...', error);
      alert('Hubo un problema al enviar el correo. Por favor, inténtalo de nuevo.');
    });
  });

  // Cerrar el div grande al hacer clic fuera de él
  document.addEventListener('click', function closeLargePaper(event) {
    if (!largePaper.contains(event.target)) {
      largePaper.remove();
      document.removeEventListener('click', closeLargePaper);
    }
  });
});