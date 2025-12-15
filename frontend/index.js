document.addEventListener('DOMContentLoaded', () => {

  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();

       window.location.href = 'signin.html';
    });
  }

  const goToSignIn = document.getElementById('goToSignin');
  if (goToSignIn) {
    goToSignIn.addEventListener('click', () => {
      window.location.href = 'signin.html';
    });
  }
const signinForm = document.getElementById('signinForm');
  if (signinForm) {
    signinForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
    });
  }

  
});
