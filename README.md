**ПРОЕКТ "MESTO-REACT-AUTH" - FRONTEND**

License: Yandex.Praktikum<br>
Version: 2.1.0<br>
Author: Dmitry Neklyudov<br>

**Описание**<br>
Это учебный проект в рамках онлайн-курса Яндекс.Практикум. 
Представляет собой фронтенд приложения, в котором пользователи могут просматривать фотографии других пользователей, отмечать понравившиеся фотографии "лайком", добавлять и удалять свои фотографии, редактировать данные профиля.

**Технологии и методологии**<br>
- Grid-layout, Flexbox;
- методология БЭМ, файловая структура Nested;
- Javascript: ООП, валидация форм средствами JavaScript;
- webpack;
- React;
- валидация форм средствами библиотек Formik, Yup;
- валидация форм с помощью пользовательского хука;
- регистрация, авторизация;
- JSDoc3.

**Запуск приложения**      
`npm run start` - запуск приложения в режиме разработки с хотрелоуд     
`npm run build` -  сборка проекта в папку build 

**Документация**<br>
Посмотреть готовую документацию:<br>
 - скачайте проект на компьютер<br>
 - зайдите в папку *./documentation/jsdoc/*<br>
 - откройте в браузере файл *index.html*<br>   

Для формирования документации запустите скрипт:      
`npm run jsdoc:build` - если у вас установлен JSDoc3;     
`npm run jsdoc:npx` - если у вас не установлен JSDoc3;
 
**Описание версий проекта**     
***Версия 2.1.0***      
Добавлены регистрация и авторизация пользователей.      

***Версия 2.0.6***       
Валидация форм реализована с помощью пользовательского хука useFormWithValidation.

***Версия 2.0.5***<br>
Валидация форм реализована с помощью библиотек Formik и Yup.<br>
Класс FormValidator отключен и больше не используется.

***Версия 2.0.4***<br>
Удаление карточек реализовано через подтверждение удаления<br>
Добавлен компонент DeleteConfirmPopup

***Версия 2.0.3***<br>
В проект добавлены прелоадеры загрузки новых данных

***Версия 2.0.2***<br>
Проект полностью переведен на React.

***Версия 2.0.1***<br>
Подключена валидация форм (класс FormValidator из версии 1.0.0)

***Версия 2.0.0***<br>
Проект частично переведен на React.
Не реализован функционал:<br>
 - снятие/установка лайков;
 - добавление/удаление карточек;
 - редактирование профиля;
 - валидация форм;

 ***Версия 1.0.0***<br>
 Проект написан на Javascript с использованием принципов ООП.<br>
 Cборка webpack.

 **Посмотреть проект**<br>
 <a href="https://dnwd843.github.io/react-mesto-auth/">***Посмотреть v.2.1.0***</a><br>
 <a href="http://dnwd843.github.io/mesto/">***Посмотреть v.1.0.0***</a>
