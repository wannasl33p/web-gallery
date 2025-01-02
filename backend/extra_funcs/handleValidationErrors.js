import { validationResult } from 'express-validator';

export default (req, res, next) => {
    const errorsList = validationResult(req); // валидация данных
    if (!errorsList.isEmpty()) {
        return res.status(400).json(errorsList.array());
    }

    next();
}