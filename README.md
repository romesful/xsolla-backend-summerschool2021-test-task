# Тестовое задание для Xsolla School 2021 - направление Backend
## Запуск
1. Установить зависимости `npm install`
2. В файле `.env`: указать порт (по умолчанию стоит `8080`), указать ссылку для подключения к базе данных MongoDB
3. Запустить проект `npm start`

## Реализованные методы
+ Создание товара
```
POST /api/products/create/ HTTP/1.1
Host: localhost:8080
Content-Length: 55
Content-Type: application/json

{"sku":"SKU","name":"NAME","type":"TYPE","price":13.37}
```

+ Редактирование товара
  + С использованием параметра `sku`
  ```
  PUT /api/products/update HTTP/1.1
  Host: localhost:8080
  Content-Length: 69
  Content-Type: application/json

  {"sku":"<SOMESKU>","name":"<UPDATEDNAME>","type":"<UPDATEDTYPE>","price":14.88}
  ```
  
  + С использованием параметра `id`
  ```
  PUT /api/products/update HTTP/1.1
  Host: localhost:8080
  Content-Length: 71
  Content-Type: application/json

  {"id":"<SOMEID>","name":"<UPDATEDNAME>","type":"<UPDATEDTYPE>","price":14.88}
  ```
  
+ Удаление товара
  + С использование параметра `sku`
  ```
  DELETE /api/products/delete_sku/<SOMESKU> HTTP/1.1
  Host: localhost:8080
  ```
  
  + С использованием параметра `id`
  ```
  DELETE /api/products/delete_id/<SOMEID> HTTP/1.1
  Host: localhost:8080
  ```
+ Получение информации о товаре
  + С использованием параметра `sku`
  ```
  GET /api/products?sku=<SOMESKU> HTTP/1.1
  Host: localhost:8080
  ```
  
  + С использованием параметра `id`
  ```
  GET /api/products?id=<SOMEID> HTTP/1.1
  Host: localhost:8080
  ```
+ Получение информации о нескольких товарах сразу
```
GET /api/products?offset=1&count=2 HTTP/1.1
Host: localhost:8080
```
`offset` - количество товаров, которые пропускаем
`count` - количество нужных товаров

## Ссылка на развернутное приложение на публичном хостинге Heroku
https://xsolla-backend-2021-romesful.herokuapp.com/api/products?offset=0&count=5
