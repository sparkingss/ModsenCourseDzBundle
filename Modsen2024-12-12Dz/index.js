/*
1 уровень:
Задача 1: Работа с async/await
Условие:
Напишите функцию delay, которая будет симулировать задержку с помощью setTimeout.
Эта функция должна принимать один параметр ms (время задержки в миллисекундах) и возвращать промис, который будет выполнен через указанное время.
Далее создайте асинхронную функцию performAction, которая сначала выведет сообщение "Action started",
затем вызовет функцию delay с задержкой 2000 миллисекунд (2 секунды), и после этого выведет сообщение "Action completed after delay".
Требования:
Используйте async/await для асинхронной работы.
Примените вашу функцию delay внутри performAction.
Сообщения должны выводиться в правильном порядке.

*/

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function performAction() {
    console.log('Action started');
    await delay(2000);
    console.log('Action completed after delay');
}

performAction();

/*
Задача 2: Работа с try/catch
Условие:
Напишите функцию divideNumbers, которая принимает два числа и возвращает результат их деления. Если второе число — это 0,
функция должна выбросить ошибку с сообщением "Нельзя делить на 0", а если оба аргумента не числа,
то ошибка должна быть выброшена с сообщением "Ожидались числа". Используйте try/catch для обработки ошибок.
Требования:
Если оба аргумента являются числами и второе число не равно 0, функция должна вернуть результат деления.
Если второе число равно 0, выбрасывается ошибка "Нельзя делить на 0".
Если хотя бы один из аргументов не является числом, выбрасывается ошибка "Ожидались числа".
*/

function divideNumbers(a, b) {
    if(b === 0) {
        throw new Error('Нельзя делить на 0');
    }

    if(isNaN(a) || isNaN(b)){
        throw new Error('Ожидались числа');
    }
    return a / b;
}


try {
    console.log(`Результат деления 1 / 2: ${divideNumbers(1, 2)}`);
}
catch (error) {
    console.log(error.message);
}

try {
    console.log(`Результат деления word / 2: ${divideNumbers('word', 2)}`);
}
catch (error) {
    console.log(error.message);
}

try {
    console.log(`Результат деления 1 / 0: ${divideNumbers(1, 0)}`);
}
catch (error) {
    console.log(error.message);
}



/*
Задача 3: Работа с async/await
Условие:
Написать функцию, которая делает HTTP-запрос к публичному API для получения данных о пользователях и выводит их имена в консоль.

Шаги, которые должна выполнить функция:
Сделать GET-запрос к API https://jsonplaceholder.typicode.com/users, чтобы получить данные о пользователях.
Проверить, успешно ли выполнен запрос. Если нет, выбросить ошибку и обработать её.	
Преобразовать ответ API в формат JSON для дальнейшей работы.
Перебрать массив полученных пользователей и вывести их имена в консоль.
*/

async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`Ошибка сети: ${response.status}`);
        }

        const users = await response.json();
        users.forEach(user => console.log(user.username));
    }
    catch (error) {
        console.error('Ошибка при выполнении запроса:', error.message);
    }
}

fetchUsers();


/*
2 уровень:

Задача 1: Работа с async/await + try…catch, promises
Условие:
Используя API JSONPlaceholder, реализуйте программу, которая выполняет следующие действия:
Получение постов:
Сделать GET-запрос к https://jsonplaceholder.typicode.com/posts для получения списка всех постов.
Фильтрация постов:
Выбрать только посты, у которых id чётное.
Получение комментариев:
Для каждого выбранного поста сделать GET-запрос к https://jsonplaceholder.typicode.com/comments?postId=<ID> для получения комментариев.
Обработка данных:
Найти комментарий с самым длинным текстом для каждого выбранного поста.
Сохранение результатов:
Для каждого поста с самым длинным комментарием отправить POST-запрос на https://jsonplaceholder.typicode.com/posts.
В теле запроса указать следующую информацию:
{
  "postId": <ID поста>,
  "longestComment": "<Текст самого длинного комментария>"
}
6. Требования:
Использовать fetch и async/await для выполнения запросов.
Обработать возможные ошибки на всех этапах работы программы.
Выполнить запросы на получение комментариев параллельно для всех выбранных постов.
*/

async function getPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if(!response.ok){
            throw new Error('Ошибка получения списка постов, код статуса: ', response.status);
        }
        const posts = await response.json();
        console.log('Посты: ', posts);
        posts.filter((post, index) => index % 2 === 0);

        const commentsPromises = posts.map(async (post, index) => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`);
            if(!response.ok){
                throw new Error(`Ошибка получения комментариев к посту ${post.id}, код статуса: ${response.status}`);
            }
            return response.json();
        });

        const comments = await Promise.all(commentsPromises);
        console.log('Комментарии: ', comments);
    } catch(error) {
        console.error(error.message);
    }
}

getPosts();