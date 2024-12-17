// 1 уровень:
// Задача 1: Работа с промисами
// Условие:
// Создайте функцию wait(ms),
// которая принимает один аргумент ms (количество миллисекунд) и возвращает Promise.
// Этот Promise должен разрешаться через указанное количество миллисекунд.

function wait(ms) {
    return new Promise(resolve => {
        setTimeout(() => resolve('Выполнено'), ms);
    });
}

wait(1000).then(message => console.log('result = ', message));

/*
Задача 2: Работа с промисами
	Создайте две функции step1() и step2(). Первая функция должна возвращать промис,
    который разрешается через 1 секунду с текстом "Шаг 1 выполнен".
    Вторая функция должна возвращать промис,
    который разрешается через 2 секунды с текстом "Шаг 2 выполнен". Используйте цепочку промисов для последовательного выполнения этих шагов.
*/

function step1() {
    return new Promise(resolve => {
        setTimeout(() => resolve('Шаг 1 выполнен'), 1000);
    })
}

function step2() {
    return new Promise(resolve => {
        setTimeout(() => resolve('Шаг 2 выполнен'), 2000);
    })
}

step1().then((message) => {
    console.log(message);
    step2().then((message) => {
        console.log(message);
    });
});

/*
Задача 3: Работа с промисами
Условие:
Создайте три функции task1(), task2() и task3(),
каждая из которых возвращает промис, который разрешается через 1, 2 и 3 секунды соответственно с текстами
"Задача 1 завершена", "Задача 2 завершена" и "Задача 3 завершена".
Используйте Promise.all для одновременного выполнения всех задач и выведите результат.
*/

function task1() {
    return new Promise(resolve => {
        setTimeout(() => resolve('Задача 1 завершена'), 1000);
    })
}

function task2() {
    return new Promise(resolve => {
        setTimeout(() => resolve('Задача 2 завершена'), 2000);
    })
}

function task3() {
    return new Promise(resolve => {
        setTimeout(() => resolve('Задача 3 завершена'), 3000);
    })
}


const promises = [task1(), task2(), task3()];
Promise.all(promises).then(result => console.log(result));

/*
2 уровень:
Задача 1: Работа с промисами


Условие: Необходимо выполнить параллельно три запроса к различным публичным API:
Получить данные о пользователях.
Получить данные о постах.
Получить данные о комментариях.

// Устанавливаем URL-адреса для запросов 
const usersUrl = 'https://jsonplaceholder.typicode.com/users'; 
const postsUrl = 'https://jsonplaceholder.typicode.com/posts'; 
const commentsUrl = 'https://jsonplaceholder.typicode.com/comments';


Все эти запросы нужно выполнить параллельно с использованием Promise.all, а затем вывести результат в консоль,
 когда все данные будут получены. Создайте функцию fetchData, которая будет принимать URL и возвращать промис.
*/

function fetchData(url) {
    return new Promise(resolve => {
            fetch(url)
                .then(async (response) => resolve(await response.json()))
                .catch(error => {
                    console.log(error);
                    resolve(null);
                })
    });
}

const usersUrl = 'https://jsonplaceholder.typicode.com/users'; 
const postsUrl = 'https://jsonplaceholder.typicode.com/posts'; 
const commentsUrl = 'https://jsonplaceholder.typicode.com/comments';

const fetchPromises = [fetchData(usersUrl), fetchData(postsUrl), fetchData(commentsUrl)];
Promise.all(fetchPromises)
    .then(result => result.forEach(response => console.log(response)))
    .catch(error => console.log(error))


/*
Задача 2: Работа с промисами

Условие:
Вам нужно отправить несколько параллельных запросов к API, но если любой из запросов не завершится в течение 5 секунд, все запросы должны быть отменены.
 Вам нужно использовать Promise.race для выполнения запросов и таймаутов.
Первый запрос — получение информации о пользователях.
Второй запрос — получение информации о постах.
Третий запрос — получение информации о комментариях.
Если любой из запросов не завершится за 5 секунд, все запросы должны быть отменены с ошибкой.

// URL-адреса для запросов
const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
const commentsUrl = 'https://jsonplaceholder.typicode.com/comments';

*/

function timeout() {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject('Время вышло'), 5000);
    })
}

Promise.race([Promise.all(fetchPromises), timeout()])
    .then(result => console.log(result))
    .catch(error => console.log(error));