import { body } from 'express-validator';

export const logValidation = [
    body('email', 'Введите корректную почту').isEmail(),
    body('password', 'Пароль должен быть минимум 6 символов').isLength({ min: 6 }),
];

export const regValidation = [
    body('email', 'Введите корректную почту').isEmail(),
    body('password', 'Пароль должен быть минимум 6 символов').isLength({ min: 6 }),
    body('fullName', 'Введите имя').isLength({ min: 1 }),
];

export const artAddValidation = [
    body('title', 'Введите название').isLength({ min: 1 }),
    body('authorName', 'Введите имя автора').isLength({ min: 1 }).isString(),
    body('imagesURL', 'Некорректаная ссылка на изображение').isArray(),

];

export const createOrderValidation = [
    body('address', 'Введите адрес, должен содержать индекс').isLength({ min: 6 })
]