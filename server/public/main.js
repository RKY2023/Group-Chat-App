  async function getLogin() {
    event.preventDefault();
    try{
      let userDetail;
      const loginMode = document.getElementById('loginMode').value;
      let url = 'http://'+window.location.host+'/api/login';
      if(loginMode == 'signup') {
        url = 'http://'+window.location.host+'/api/signup';
        userDetail = {
          name: event.target.name.value,
          email: event.target.email.value,
          password: event.target.password.value,
          phoneno: event.target.phoneno.value
        }
      } else {
        userDetail = {
          email: event.target.email.value,
          password: event.target.password.value
        }
      }
      console.log(userDetail);
      let response;

        response = await axios.post(url, userDetail); 
      // const data = await response.json();
      if(response.data.error) {
        document.getElementById('loginError').innerHTML = response.data.error.message;
        return;
      }
      if (loginMode == 'login' || loginMode == 'signup') {
        localStorage.setItem('token',response.data.token); 
        window.location.href = 'http://'+window.location.host+'/chat';
      }
   
    } catch(err) {
      console.log(err);
    }
    return false;
  }
