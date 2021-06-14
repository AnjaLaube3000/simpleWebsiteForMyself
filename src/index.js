(function () {
  // https://dashboard.emailjs.com/admin/integration
  emailjs.init('user_LutDZyhGG3jsFzMomSf1t');
})();

window.onload = () => {
  const contactForm = document.getElementById('contact-form');
  const loadingScreen = document.getElementById('contact-form-loading-screen');
  const successScreen = document.getElementById('contact-form-success-screen');
  const errorScreen = document.getElementById('contact-form-error-screen');
  const inputs = document.querySelectorAll('input,textarea')
  const button = document.querySelector('button')

  function setFormStatus(isLoading, hasError){
    loadingScreen.classList.remove('active')
    successScreen.classList.remove('active');
    errorScreen.classList.remove('active');
    if(isLoading) {
      loadingScreen.classList.add('active')
    } else if( hasError ) {
      errorScreen.classList.add('active');
    } else {
      successScreen.classList.add('active');
    }
  }
   contactForm.addEventListener('submit', function (event) {
    event.preventDefault()
    if( loadingScreen.classList.contains('active') ) return;
    // generate a five digit number for the contact_number variable
    this.contact_number.value = Math.random() * 100000 | 0;
    // these IDs from the previous steps
    setFormStatus(true)

    emailjs.sendForm('contact_service', 'contact_form', this)
      .then(function () {
        setFormStatus(false)
        inputs.forEach((input) => {
          input.value = ''
        })
      }), function (error) {
        console.log('FAILED...', error);
        alert('submission failed')
        setFormStatus(false, error)
      }
  })

}

//adds time
function getTime() {
  const today = new Date()
  let minutes = today.getMinutes()
  if (minutes < 10) {
    minutes = '0' + minutes
  }

  let hour = today.getHours()
  let suffix
  //Adding endings
  if (hour >= 12) {
    suffix = "PM"
  } else {
    suffix = "AM"
  }
  // changes hour from 24h format to 12h format
  if (hour > 0 && hour <= 12) {
    hour = hour
  } else if (hour > 12) {
    hour = hour - 12
  } else if (hour == 0) {
    hour = "12"
  }

  const time = 'Berlin, CET ' + hour + ':' + minutes + ' ' + suffix
  const spanForTime = document.querySelectorAll('.clock')
  spanForTime.forEach((span) => {
    span.innerHTML = time
  })
  return spanForTime
}

setInterval(getTime, 1000)
