import express from 'express';
import mongoose, { get } from 'mongoose';
import multer from 'multer';
import cors from 'cors';

import { regValidation, logValidation, artAddValidation, createOrderValidation } from './validation.js';
import tryJWT from './extra_funcs/tryJWT.js';
import handleValidationErrors from './extra_funcs/handleValidationErrors.js';

import { register, login, profile, confirmOrder, getLogin, denyOrder } from './controllers/UserController.js';
import { addArtwork, getArtAll, getArt, deleteArtwork, editArtwork } from './controllers/ArtController.js';
import { createOrder } from './controllers/OrderController.js';
import { confirm, moderationDelete, loadModeration } from './controllers/ModrationController.js';

mongoose.connect('mongodb+srv://admin:1111@cluster0.xgr4g.mongodb.net/project?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log('DataBase Activated'))
    .catch((err) => console.log('DataBase error ', err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, callback) => {
        callback(null, 'uploads');

    },
    filename: (_, file, callback) => {
        callback(null, file.originalname);
    },
});

const upload = multer({ storage });
app.use(cors())
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// app.get('/profile/:id', profile); 
app.get('/profile', tryJWT, profile);
app.get('/login/try', tryJWT, getLogin)
app.post('/login', logValidation, handleValidationErrors, login);
app.post('/register', regValidation, handleValidationErrors, register);
app.post('/profile/add', tryJWT, artAddValidation, handleValidationErrors, addArtwork);

app.post('/upload', upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
});

app.get('/catalog', getArtAll);
app.get('/art/:id', getArt);
app.delete('/art/:id', tryJWT, deleteArtwork);
app.patch('/art/:id', tryJWT, editArtwork);
app.post('/art/:id', createOrderValidation, handleValidationErrors, createOrder);

app.patch('/moderation', tryJWT, confirm);
app.get('/moderation', tryJWT, loadModeration);
app.delete('/moderation', tryJWT, moderationDelete);

app.patch('/profile', tryJWT, confirmOrder);
app.patch('/profile/cancel', tryJWT, denyOrder);



app.listen(4000, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Сервер запущен')
});