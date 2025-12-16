document.addEventListener('DOMContentLoaded', () => {

  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const phone = document.getElementById('phone').value.trim();

      try {
        const response = await axios.post('http://localhost:3000/user/signup', {
          name,
          email,
          password,
          phone
        });

        console.log(response.data);
        // Redirect to signin page after successful signup
        window.location.href = 'signin.html';
      } catch (error) {
        console.error(error.response.data);
        alert(error.response.data.message || 'Signup failed');
      }
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

      try {
        const response = await axios.post('http://localhost:3000/user/signin', {
          email,
          password
        });

        console.log(response.data);
        alert('Signin successful!');

        
        localStorage.setItem('userId', response.data.userId);
        window.location.href = 'chatWindow.html';
      } catch (error) {
        console.error(error.response.data);
        alert(error.response.data.message || 'Signin failed');
      }
    });
  }
});

