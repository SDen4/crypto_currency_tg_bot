# Используем официальный образ Node.js (LTS версия)
FROM node:24.13.1-slim

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /src

# Копируем package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Команда запуска
CMD ["npm", "start"]
