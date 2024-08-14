# Запуск приложения

#### - Запустить локально через Docker:

Копируйте repo:

```bash
  git clone https://github.com/b1on1kkk/sagtech-test-task.git
```

Перейдите в папку и напишите консоли:

```bash
  docker-compose up --build
```

#### - Запустить локально:

Копируйте repo:

```bash
  git clone https://github.com/b1on1kkk/sagtech-test-task.git
```

Создайте (и добавьте) или раскомментируйте `.env` файлик:

```bash
  PORT="provide a port where project will run"
  JWT_SECRET="JWT secret key"

  # microservice communication
  POSTS_PORT="provide a port where POSTS microservice will run"
  ACCOUNT_PORT="provide a port where ACCOUNT microservice will run"

  #db
  DATABASE_URL="postgresql://user:password@host:port/database_name?schema=public"
```

Установите пакеты:

```bash
  npm install
```

Запустите проект:

```bash
  npm run start:dev
```

# TODO

- [x] Инициализация проекта
- [x] Создание схемы базы данных
  - [x] Определить модели в Prisma
- [x] Реализация API эндпоинтов
  - [x] Пользователи
  - [x] Записи
- [ ] Дополнительные задачи (опционально):
  - [x] Написание unit и e2e тестов. (e2e - написал для роутов, unit - для гварда)
  - [x] Добавление функциональности фильтрации и пагинации для GET /posts и GET /users.
  - [ ] Развертывание проекта на облачной платформе, например, Heroku.

# Архитектура

Решил использовать микросервисную архитектуру, имеет вид:

![architecture](https://github.com/user-attachments/assets/8bcaba48-c58a-4e9a-882e-cb71fa17638c)

# Какие улучшения можно произвести?

По хорошему, нужно использовать нормальный брокер: RabbitMQ или Kafka. В своем проекте я использовал просто TCP соединение, ибо делал все максимально быстро и не хотел заморачиваться.

Основываясь на том, что мы используем TCP или брокеры, стоило бы задуматься о концепции `CQRS (The Command and Query Responsibility Segregation)`. Разделив команды от API Gateway на events, queries и commands мы получим более чистый и интуитивно понятный код.

Возможно, из за своего малого опыта, я не заметил ещё что-то, но я старался :). С радостью послушаю фидбэк и учту все недочеты.
