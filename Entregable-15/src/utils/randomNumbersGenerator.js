const generateRandomNumbers = (n) => {
    const randomNumbers = {};
    for (var i = 0; i < n; i++) {
    var randomNum = Math.floor(Math.random() * 1000);
    randomNumbers[randomNum] = (randomNumbers[randomNum] || 0) + 1; 
    }
    return randomNumbers;
}

process.on('message', num => {
    const numbers = generateRandomNumbers(num);
    process.send(numbers);
})