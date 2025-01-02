import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import ArtModel from '../models/Art.js'
import UserModel from '../models/User.js';
import User from '../models/User.js';
import NotificationModel from '../models/Notification.js';
import OrderModel from '../models/Order.js'


export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const passwordHashE = await bcrypt.hash(password, salt); // хеширование пароля

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: passwordHashE,
            role: 'User',
        });

        const user = await doc.save();

        const token = jwt.sign({ // генерация токена
            _id: user._id,
        }, 'keyword',
        );

        const { passwordHash, ...userData } = user._doc; // отделение хэша от основнйо информации для отпрваки клиенту

        res.json({
            ...userData,
            token,

        });


    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Cannot reg"
        })
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                messege: 'Не удалось авторизоваться',
            });
        }

        const isPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isPass) {
            return res.status(400).json({
                message: 'Не удалось авторизоваться',
            });
        }

        const token = jwt.sign(
            {                           // генерация токена
                _id: user._id,
            }, 'keyword',

        );


        const { passwordHash, ...userData } = user._doc; // отделение хэша от основнйо информации для отпрваки клиенту

        res.json({
            ...userData,
            token,

        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Cannot log"
        })
    }

}

export const getLogin = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                msg: "Пользователя не существует"
            })
        }
        const { passwordHash, ...userData } = user._doc; // отделение хэша от основнйо информации для отпрваки клиенту

        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Cannot log"
        })
    }
}

export const profile = async (req, res) => {
    try {

        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                messege: 'Пользователь не найден'
            })
        };

        const { passwordHash, role, ...userData } = user._doc; // отделение хэша от основнйо информации для отпрваки клиенту

        const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

        const userId = userData._id;
        const arts = await ArtModel.find({
            owner: {
                _id: userId
            }
        })



        const notices = await NotificationModel.find({
            addresser: {
                _id: userId
            }
        })

        res.json([userData, arts, notices]);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            messege: "Cannot access"
        })
    }
}

export const confirmOrder = async (req, res) => {
    try {
        const orderId = req.body.orderId;
        const date = new Date();
        const dateNow = `${date.toLocaleTimeString()}, ${date.toLocaleDateString()}`;
        const doc = await OrderModel.findOneAndUpdate({
            _id: orderId
        }, {
            $set: {
                orderStatus: "confirmed",
                orderConfirmDate: dateNow,
            }
        });

        if (!doc) {
            return res.status(404).json({
                message: 'Заказа не существует',
            });
        }

        const art = await ArtModel.findOneAndUpdate({
            _id: doc.artId
        }, {
            $set: {
                catalogStatus: "sold"
            }
        });

        await NotificationModel.findOneAndDelete({ orderID: doc._id })

        const notice = await new NotificationModel({
            addresser: doc.owner,
            type: "static",
            message: `Заказ на картину(${art.title}) подтвержден. Информация: имя заказчика: ${doc.customerName}, номер телефона: +375${doc.phoneNumber}, адрес: ${doc.address} `,
            date: dateNow,
        });

        await notice.save();

        const noticeForCustomer = await new NotificationModel({
            addresser: doc.customer,
            type: "static",
            message: `Выш заказ на картину(${art.title}) подтвержден. `,
            date: dateNow,
        });


        await noticeForCustomer.save();

        return res.json({
            message: `Успешное подтверждение заказа ${doc}`
        });



    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Confirm error"
        })
    }
}

export const denyOrder = async (req, res) => {
    try {
        const date = new Date();
        const dateNow = `${date.toLocaleTimeString()}, ${date.toLocaleDateString()}`;
        if (req.body.orderId) {
            const doc = await OrderModel.findOneAndUpdate({ _id: req.body.orderId }, { $set: { orderStatus: "canceled" } });

            console.log(req.body.orderId);
            if (!doc) {
                return res.status(404).json({
                    message: 'Заказа не существует',
                });
            }
            await NotificationModel.findOneAndDelete({ orderID: doc._id })


            const notice = new NotificationModel({
                addresser: doc.customer,
                type: "static",
                message: `Ваш заказ (${doc._id}) не одобрен!`,
                date: dateNow
            });

            await notice.save();

            res.json({
                message: 'Заказ отменен',
            });
        }


    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Delete error"
        })
    }

}