
const carDatabase = [
  {
    "number": "С 455 ЕЕ ",
    "name": 0,
    "apartment": 37,
    "phone": "8-927-148-88-64"
  },
  {
    "number": "Т 071 МТ ",
    "name": 0,
    "apartment": 33,
    "phone": ""
  },
  {
    "number": "Н 122 ВС ",
    "name": 0,
    "apartment": 35,
    "phone": "89878343544"
  },
  {
    "number": "Р 361 ЕЕ",
    "name": 0,
    "apartment": 41,
    "phone": "8-927-220-29-08"
  },
  {
    "number": "М 848 РЕ",
    "name": 0,
    "apartment": 25,
    "phone": "8-917-207-51-13"
  },
  {
    "number": "К 846 АМ",
    "name": 0,
    "apartment": 79,
    "phone": "8-927-229-34-29"
  },
  {
    "number": "М 648 РЕ",
    "name": 0,
    "apartment": 65,
    "phone": "8-937-636-36-89"
  },
  {
    "number": "486",
    "name": 0,
    "apartment": 95,
    "phone": "8-937-241-26-46"
  },
  {
    "number": "К 365 ХС",
    "name": 0,
    "apartment": 19,
    "phone": "8-917-971-21-71"
  },
  {
    "number": "Н 096 ВМ",
    "name": 0,
    "apartment": 50,
    "phone": "8-937-967-62-99"
  },
  {
    "number": "М 639 ВК",
    "name": 0,
    "apartment": 24,
    "phone": "8-937-969-63-31"
  },
  {
    "number": "Р 393 НХ",
    "name": 0,
    "apartment": 89,
    "phone": "8-937-269-03-58"
  },
  {
    "number": "К 697 УХ 164",
    "name": 0,
    "apartment": 78,
    "phone": "8-937-243-07-58"
  },
  {
    "number": "437",
    "name": 0,
    "apartment": 65,
    "phone": "8-929-776-23-43"
  },
  {
    "number": "У 236 ТО",
    "name": 0,
    "apartment": 65,
    "phone": "8-937-636-36-89"
  },
  {
    "number": "К 108 УН",
    "name": 0,
    "apartment": 12,
    "phone": "8-927-626-59-51"
  },
  {
    "number": "Х 797 ЕР",
    "name": 0,
    "apartment": 12,
    "phone": ""
  },
  {
    "number": "В 558 КР",
    "name": 0,
    "apartment": 1,
    "phone": "8-927-156-78-73"
  },
  {
    "number": "Е 247 РА",
    "name": 0,
    "apartment": 38,
    "phone": "8-902-042-67-62"
  },
  {
    "number": "М 969 ТЕ",
    "name": 0,
    "apartment": 1,
    "phone": "8-927-156-78-73"
  },
  {
    "number": "947",
    "name": 0,
    "apartment": 60,
    "phone": "8-937-961-49-95"
  },
  {
    "number": "Е 275 ОН",
    "name": 0,
    "apartment": 8,
    "phone": "8-937-268-10-08"
  },
  {
    "number": "Т 909 АХ",
    "name": 0,
    "apartment": 57,
    "phone": "8-927-225-37-64"
  },
  {
    "number": "В 330 ВХ",
    "name": 0,
    "apartment": 57,
    "phone": "8-927-225-37-64"
  },
  {
    "number": "К 809 КА",
    "name": 0,
    "apartment": 41,
    "phone": "8-927-220-29-08"
  },
  {
    "number": "786",
    "name": 0,
    "apartment": 95,
    "phone": "8-937-241-26-46"
  },
  {
    "number": "В 929 СК",
    "name": 0,
    "apartment": 9,
    "phone": "8-902-048-99-40"
  },
  {
    "number": "М 240 ХН",
    "name": 0,
    "apartment": 9,
    "phone": "8-902-048-99-40"
  },
  {
    "number": "У 026 МО",
    "name": 0,
    "apartment": 42,
    "phone": "8-996-128-98-58"
  }
];


const carNumberInput = document.getElementById('carNumberInput');
const searchButton = document.getElementById('searchButton');
const resultContainer = document.getElementById('resultContainer');
const resultInfo = document.getElementById('resultInfo');
const errorElement = document.getElementById('error');
//anmate
const h1 = document.querySelector('h1');
    const text = h1.textContent;
    h1.textContent = '';
    
    let i = 0;
    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.animation = 'blink 1s infinite';
    cursor.style.marginLeft = '5px';
    h1.appendChild(cursor);
    
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        h1.insertBefore(document.createTextNode(text.charAt(i)), cursor);
        i++;
      } else {
        clearInterval(typingEffect);
        // Замедляем мигание курсора после завершения
        cursor.style.animation = 'blink 1.5s infinite';
      }
    }, 80);
//q

function normalizeNumber(number) {
    return number.replace(/\s+/g, '').toUpperCase();
}


function extractDigits(number) {
    return number.replace(/\D/g, '');
}


function searchCar() {
    const inputNumber = carNumberInput.value.trim();
    
   
    if (!inputNumber) {
        showError('Пожалуйста, введите номер автомобиля');
        hideResult();
        return;
    }
    
    const normalizedInput = normalizeNumber(inputNumber);
    const digitsInput = extractDigits(inputNumber);
    
  
    let car = carDatabase.find(car => {
        const normalizedCarNumber = normalizeNumber(car.number);
        return normalizedCarNumber === normalizedInput;
    });
    
    
    if (!car && digitsInput) {
        car = carDatabase.find(car => {
            const carDigits = extractDigits(car.number);
            return carDigits === digitsInput;
        });
    }
    
    if (car) {
        hideError();
        showResult(car);
    } else {
        hideError();
        showNoResult();
    }
}


function showResult(car) {
    
    const name = car.name === 0 ? '<span class="missing">Не указано</span>' : car.name;
    
    
    const phone = car.phone ? car.phone : '<span class="missing">Не указан</span>';
    
    resultInfo.innerHTML = `
        <p><strong>Номер авто:</strong> ${car.number}</p>
        <p><strong>Квартира:</strong> № ${car.apartment}</p>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
    `;
    resultContainer.classList.add('show');
}


function showNoResult() {
    resultInfo.innerHTML = `
        <div class="no-result">
            <p>❌ Автомобиль с таким номером не найден</p>
            <p style="margin-top: 10px; font-size: 14px;">Попробуйте проверить правильность ввода</p>
            <p style="font-size: 14px;">Возможно автомобиля нет в базе</p>
        </div>
    `;
    resultContainer.classList.add('show');
}


function hideResult() {
    resultContainer.classList.remove('show');
}


function showError(message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}


function hideError() {
    errorElement.style.display = 'none';
}


searchButton.addEventListener('click', searchCar);

carNumberInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchCar();
    }
});


carNumberInput.addEventListener('input', () => {
    hideError();
    hideResult();
});


window.addEventListener('load', () => {
    carNumberInput.focus();

});



