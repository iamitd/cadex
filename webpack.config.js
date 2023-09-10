const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: './public/script.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/dist'),
    },
    devServer: {
        static: path.join(__dirname, 'public'), // Путь к статическим файлам
        open: true, // Открывать браузер при запуске сервера
    },
};