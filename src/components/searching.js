import {rules, createComparison} from "../lib/compare.js";


export function initSearching(searchField) {
    // @todo: #5.1 — настроить компаратор
    const compare = createComparison(
        { skipEmptyTargetValues: true }, // Пропускаем пустые значения
        rules.searchMultipleFields(searchField, ['date', 'customer', 'seller'], false) // Правило для поиска
    );
    return (data, state, action) => {
        // @todo: #5.2 — применить компаратор
        const searchValue = state[searchField]; // Значение поля поиска

        if (!searchValue) {
            return data; // Если значение пустое, возвращаем все данные
        }

        // Фильтруем данные с помощью компаратора
        return data.filter(item => {
            return compare(item, searchValue); // Применяем функцию сравнения
        });
    };
}