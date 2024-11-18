document.querySelector(".submit-btn").addEventListener("click", function() {
    const surname = document.getElementById("surname").value;
    const numbers = document.getElementById("numbers").value;
    const name = document.getElementById("name").value;
    const patronymic = document.getElementById("patronymic").value;
    const birth = document.getElementById("birth").value;

    if (surname === 'Юрченко' && numbers === '71234567890' && name === 'Александр' && patronymic === 'Сергеевич' && birth === '25.10.1990') {
        window.location.href = "win.html"; // Перенаправление на другую страницу
    } else {
        alert("Доступ запрещен"); // Сообщение о неверных данных
    }
});



let currentKeyboard = 1; // Переменная для отслеживания текущей клавиатуры

document.getElementById('toggleButton_eng_rus').onclick = function() {
    const keyboard1 = document.getElementById('keyboard1');
    const keyboard2 = document.getElementById('keyboard2');

    if (currentKeyboard === 1) {
        keyboard1.style.display = 'none'; // Скрываем первую клавиатуру
        keyboard2.style.display = 'block'; // Показываем вторую клавиатуру
        currentKeyboard = 2; // Обновляем текущее состояние
    } else {
        keyboard1.style.display = 'block'; // Показываем первую клавиатуру
        keyboard2.style.display = 'none'; // Скрываем вторую клавиатуру
        currentKeyboard = 1; // Обновляем текущее состояние
    }
};


const buttons = document.querySelectorAll(".keyboard button");
let activeInput = null;
let isUpperCase = false; // Состояние для отслеживания регистра

const inputs = [
    document.getElementById("surname"),
    document.getElementById("name"),
    document.getElementById("patronymic"),
    document.getElementById("birth"),
    document.getElementById("numbers")
];

// Правила для каждого инпута
const inputRules = {
    surname: /^[A-Za-zА-Яа-яёЁ]+$/, // Только буквы
    name: /^[A-Za-zА-Яа-яёЁ]+$/,   // Только буквы
    patronymic: /^[A-Za-zА-Яа-яёЁ]+$/, // Только буквы
    birth: /^\d{0,2}(\.\d{0,2})?(\.\d{0,4})?$/, // ДД.ММ.ГГГГ
    numbers: /^\d{0,2}(\d{0,2})?(\d{0,7})?$/,
};




// Функция для установки активного поля ввода
function setActiveInput(input) {
    activeInput = input;
    input.focus();
}

// Обработчики событий для фокуса на полях ввода
inputs.forEach(input => {
    input.addEventListener("focus", () => setActiveInput(input));
});

// Функция для перехода к следующему инпуту
function focusNextInput() {
    const currentIndex = inputs.indexOf(activeInput);
    const nextInput = inputs[currentIndex + 1] || inputs[0]; // Зацикливаем на первом инпуте

    setActiveInput(nextInput);
}

// Обработка нажатий кнопок на клавиатуре
buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (!activeInput) return; // Если нет активного поля, ничего не делаем

        const buttonText = button.textContent.trim();

        switch (true) {
            case button.classList.contains("back"):
                activeInput.value = activeInput.value.slice(0, -1);
                break;
            case button.classList.contains("enter-btn"):
            case button.classList.contains("tab"):
                focusNextInput();
                break;
            case button.classList.contains("space"):
                activeInput.value += " ";
                break;
            case button.classList.contains('caps'):
                isUpperCase = !isUpperCase; // Переключение состояния
                toggleCaseButtons();
                break;
            default:
                // Проверяем, соответствует ли ввод правилу
                if (isInputValid(activeInput, buttonText)) {
                    activeInput.value += isUpperCase ? buttonText.toUpperCase() : buttonText.toLowerCase();
                }
        }
    });
});

// Проверка соответствия введенного текста правилам
function isInputValid(input, text) {

    const inputId = input.id; // Получаем ID активного инпута
    const regex = inputRules[inputId]; // Получаем соответствующее правило

    const newValue = input.value + text; // Новый текст после добавления кнопки

    return regex.test(newValue); // Проверяем соответствие
}

// Функция для переключения регистра кнопок
function toggleCaseButtons() {
    buttons.forEach(btn => {
        if (btn.classList.contains('letter')) {
            btn.textContent = isUpperCase ? btn.textContent.toUpperCase() : btn.textContent.toLowerCase();
        }
    });
}
