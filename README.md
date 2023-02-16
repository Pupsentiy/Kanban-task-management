# Kanban

Запуск проекта:
1. npm install
2. npm start

## Стек технологий

- React, TypeScript
- Styled-Components
- Redux
- LocalStorage

## Реализовано
- Все данные сохраняются в LocalStorage.
- Проект содержит 2 страницы:
    - Страница с выбором проекта
    - Страница с задачами
- Каждая доска имеет 3 колонки c возможностью изменения статуса с помощью drag-n-drop: 
    - Queue
    - Development
    - Done
- Возможность выбора цвета Background для доски.
- Возможность создавать/удалять задачу.
- Возможность создавать/удалять доску.
- Возможность редактирования задачи.
- Адаптация под мобильные устройства.
- Поиск по номеру задачи.
- Каждая задача имеет:
    - Номер задачи
    - Заголовок
    - Описание
    - Дата создания
    - Время в работе
    - Дата окончания
    - Приоритет
    - Вложенные файлы
    - Текущий статус
    - Возможность добавлять подзадачи;
    - Система каскадных комментариев(т.е. Можно оставить комментарий под коментарием под комментарием...
      Пример можно увидеть на reddit или picabu)

![Screenshot](src/assets/img/imgReadme/screen1.png)

## Оформление приложения 

- Создание Доски, выбор цвета Background.

![Screemshot](src/assets/img/imgReadme/screen-2.png)
![Screemshot](src/assets/img/imgReadme/screen-3.png)

- Поиск Задач, по клику на задачу переходит в проект в котором она находиться, И открывает ее в модальном окне.

![Screemshot](src/assets/img/imgReadme/screen6.png)
 
- Удаление Досок.

![Screemshot](src/assets/img/imgReadme/screen7.png)

- Модальное Окно редактирования задачи.

![Screemshot](src/assets/img/imgReadme/screen10.png)
![Screemshot](src/assets/img/imgReadme/screen11.png)

- Метка Приоритета.

![Screemshot](src/assets/img/imgReadme/screen9.png)

- Срок задачи, дата создания задачи, время в работе.

![Screemshot](src/assets/img/imgReadme/screen8.png)

- #### Отслеживание:
1. Количество коментариев.
2. Метка приоритета.
3. Срок задачи.
4. Количество выполненных и не выполненных подзадач.
5. Номер задачи.
6. Название Задачи.

- Адаптивная верстка:

![Screemshot](src/assets/img/imgReadme/screen12.png)
![Screemshot](src/assets/img/imgReadme/screen5.png)
![Screemshot](src/assets/img/imgReadme/screen4.jpg)
![Screemshot](src/assets/img/imgReadme/screen13.png)
![Screemshot](src/assets/img/imgReadme/screen14.png)
![Screemshot](src/assets/img/imgReadme/screen15.png)
