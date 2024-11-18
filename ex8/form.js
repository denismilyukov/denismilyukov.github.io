document.getElementById('openModal').onclick = function() {
       document.getElementById('feedbackModal').style.display = 'flex';
       history.pushState(null, null, '#feedback-form');
       loadFormData();
   };

   window.onpopstate = function() {
       document.getElementById('feedbackModal').style.display = 'none';
   };

   document.getElementById('feedbackForm').onsubmit = function(event) {
       event.preventDefault();
       const formData = new FormData(this);
       fetch('https://formcarry.com/s/{your_form_id}', {
           method: 'POST',
           body: formData
       })
       .then(response => {
           if (!response.ok) throw new Error('Ошибка при отправке данных');
           alert('Форма успешно отправлена!');
           localStorage.removeItem('formData');
           this.reset();
       })
       .catch(error => {
           alert('Произошла ошибка: ' + error);
       });

       saveFormData();
   };

   function saveFormData() {
       const formData = {};
       const formElements = document.querySelectorAll('#feedbackForm input, #feedbackForm textarea');
       formElements.forEach(element => {
           formData[element.name] = element.value;
       });
       localStorage.setItem('formData', JSON.stringify(formData));
   }

   function loadFormData() {
       const savedData = JSON.parse(localStorage.getItem('formData'));
       if (savedData) {
           for (const key in savedData) {
               const element = document.querySelector(`input[name="${key}"], textarea[name="${key}"]`);
               if (element) element.value = savedData[key];
           }
       }
   }