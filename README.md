  <h2>
    Тестовое задание: "Заказ товаров". <br>
    Проект Visual Studio 2022 (Angular/.NET 8)
  </h2>
<ul>
<li>Перед запуском ImageWorker.sln, зайдите в каталог angular.client и запустите <b>npm-install.bat</b> (необходима поддержка Angular в Visual Studio или установленный node.js) для восстановления npm-пакетов;</li>
<li>Запустите ImageWorker.sln (файл решения Visual Studio) из корневого каталога;</li>
<li>Запустите отладку по F5.</li>
<li>Результат будет отображен в браузере.</h4></li>
  </ul>
<h3> клиент запускается на https://localhost:4200/</h3>
<b>Вариант 1:</b><br>
<i>Реализовать сервис с JSON - сервис для предоставления информации о списке товаров, а также возможностью заказа/удаления товара и заказа.</i><br>
В качестве БД можно использовать статический объект в контроллере asp.net или любую известную вам реляционную СУБД
В качестве клиента - любой инструмент для отправки и получения запросов. Ex: Insomnia или Restlet плагин для Хрома
Как минимум, должны быть реализованы сущности "Товар" и "Заказ", и методы работы с этими сущностями: добавление нового товара в список, удаление существующего товара, просмотр списка существующих товаров, создание заказа на товар (или товары - тут реализация на усмотрение кандидата), удаление заказа, просмотр списка заказов.
<br>
========================================<br>
<b>Angular-клиент недоработан в связи с ограниченным сроком реализации backend'а</b>
