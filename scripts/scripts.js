// Получаем все элементы фильтров, автомобилей и контейнер с автомобилями
const filterItems = document.querySelectorAll('.cars-filter li');
const carItems = document.querySelectorAll('.car-item');
const carsContent = document.getElementById('cars-content');

// Добавляем обработчик клика на каждый элемент фильтра
filterItems.forEach((item) => {
  item.onclick = () => {
    // Удаляем класс 'active' со всех элементов фильтра
    filterItems.forEach(el => el.classList.remove('active'));
    // Добавляем класс 'active' к выбранному элементу
    item.classList.add('active');
    
    // Получаем текст выбранного фильтра (в нижнем регистре)
    const filterText = item.textContent.toLowerCase();
    
    // Проходим по всем автомобилям и показываем/скрываем их в зависимости от фильтра
    carItems.forEach(car => {
      if (filterText === 'все марки' || 
          car.querySelector('h3').textContent.toLowerCase().includes(filterText)) {
        car.style.display = 'flex';
      } else {
        car.style.display = 'none';
      }
    });
    
    // Прокручиваем страницу к контейнеру с автомобилями
    carsContent.scrollIntoView({ behavior: 'instant' });
  };
});

// Валидация формы заявок
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.booking-form-fields');
  const submitButton = document.querySelector('.booking-button');
  
  // Находим все поля формы
  const formFields = [
    document.getElementById('car') || document.querySelector('input[placeholder="Автомобиль"]'),
    document.getElementById('name') || document.querySelector('input[placeholder="Ваше имя"]'),
    document.getElementById('phone') || document.querySelector('input[placeholder="Ваш телефон"]')
  ];
  
  // Добавляем обработчик события отправки формы
  submitButton.addEventListener('click', function(e) {
    e.preventDefault(); // Предотвращаем стандартное поведение формы
    
    let isValid = true;
    let allFilled = true;
    
    // Проверяем каждое поле
    formFields.forEach(field => {
      // Проверяем, заполнено ли поле
      if (!field.value.trim()) {
        field.style.borderColor = 'red';
        allFilled = false;
      } else {
        field.style.borderColor = '#ffffff';
      }
      
      // Дополнительная валидация для телефона
      if (field.placeholder === 'Ваш телефон') {
        const phoneRegex = /^[\+]?[0-9]{10,15}$/;
        if (!phoneRegex.test(field.value.replace(/\D/g, ''))) {
          field.style.borderColor = 'red';
          isValid = false;
        }
      }
      
      // Дополнительная валидация для имени
      if (field.placeholder === 'Ваше имя') {
        if (field.value.length < 2) {
          field.style.borderColor = 'red';
          isValid = false;
        }
      }
    });
    
    // Если все поля заполнены и валидны, показываем сообщение
    if (allFilled && isValid) {
      alert('Спасибо за заявку! Мы скоро свяжемся с вами');
      
      // Очищаем поля формы
      formFields.forEach(field => {
        field.value = '';
        field.style.borderColor = '#ffffff';
      });
    } else {
      // Если есть ошибки, показываем сообщение об ошибке
      alert('Пожалуйста, заполните все поля корректно');
    }
  });
});