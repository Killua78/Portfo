
document.getElementById('toggle-dark').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

document.getElementById('contact-form').addEventListener('submit', function(e){
  e.preventDefault();
  document.getElementById('response').textContent = "Formulaire envoyé (simulé), tu peux maintenant passer au PHP !";
  this.reset();
});