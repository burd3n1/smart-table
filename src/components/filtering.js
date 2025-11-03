import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)                                    // Получаем ключи из объекта
        .forEach((elementName) => {                        // Перебираем по именам
            elements[elementName].append(                    // В каждый элемент добавляем опции
                ...Object.values(indexes[elementName])       // Формируем массив имён, значений опций
                    .map(name => {                     // Используем name как значение и текстовое содержимое
                        const option = document.createElement('option'); // Создаем тег <option>
                        option.value = name;           // Устанавливаем значение атрибута value
                        option.textContent = name;     // Устанавливаем текстовое содержимое
                        return option;                 // Возвращаем созданный тег
                    })
            );
        });

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        if (action && action.name === 'clear') {
            const button = action.target; // Кнопка, которая была нажата
            const field = button.dataset.field; // Поле для очистки

            // Находим родительский элемент кнопки
            const parentElement = button.parentElement;

            // Находим поле ввода внутри родительского элемента
            const input = parentElement.querySelector('input');

            // Сбрасываем значение поля ввода
            if (input) {
                input.value = '';

                // Обновляем соответствующее поле в state
                if (field && state[field]) {
                    state[field] = ''; // Очищаем значение в state
                }
            }
        }


        // @todo: #4.5 — отфильтровать данные используя компаратор
        return data.filter(row => compare(row, state));
    }
}