function validateInput(input) {
    const regex = /^d{12}$/;
    return regex.test(input);
}

// Примеры использования
console.log(validateInput(12345678901)); // true
console.log(validateInput("1234567890"));  // false
console.log(validateInput("123456789012")); // false
console.log(validateInput("12345abc8901")); // false