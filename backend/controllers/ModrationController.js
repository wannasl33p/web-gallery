import ArtModel from "../models/Art.js";
import UserModel from "../models/User.js";
import OrderModel from "../models/Order.js";
import NotificationModel from "../models/Notification.js";

export const loadModeration = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (user.role === "User") {
      return res.status(423).json({
        message: "Нет доступа",
      });
    }

    const doc = await ArtModel.find({
      catalogStatus: "moderation",
    });

    const orders = await OrderModel.find({
      orderStatus: "moderation1",
    });

    return res.json([doc, orders]);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Moderation page error",
    });
  }
};

export const confirm = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    const date = new Date();
    const dateNow = `${date.toLocaleTimeString()}, ${date.toLocaleDateString()}`;
    console.log(req.userId);
    if (user.role === "user") {
      return res.status(423).json({
        message: "Нет доступа",
      });
    }

    if (req.body.artId) {
      const artId = req.body.artId;
      const doc = await ArtModel.findOneAndUpdate(
        {
          _id: artId,
        },
        {
          $set: {
            _id: artId,
            catalogStatus: "on",
          },
        }
      );

      if (!doc) {
        return res.status(404).json({
          message: "Картины не существует",
        });
      }
      const notice = await new NotificationModel({
        addresser: doc.owner,
        type: "static",
        message: `Ваша картина (${doc.title}) добавлена в каталог`,
        date: dateNow
      });

      await notice.save();

      return res.json({
        message: `Успешное подтверждение добавление работы ${doc} в каталог`,
      });
    } else if (req.body.orderId) {
      const orderId = req.body.orderId;
      const doc = await OrderModel.findOneAndUpdate(
        {
          _id: orderId,
        },
        {
          $set: {
            orderStatus: "moderation2",
          },
        }
      );
      if (!doc) {
        return res.status(404).json({
          message: "Заказа не существует",
        });
      }
      const art = await ArtModel.findById(doc.artId);

      const notice = await new NotificationModel({
        addresser: doc.owner,
        type: "dynamic",
        message: `Заказ на картину (${art.title}), подвердите, если готовы отправлять. Свяжитесь для уточнения. Информация: Имя:${doc.customerName}, номер телефона: +375${doc.phoneNumber}, адрес: ${doc.address} `,
        orderID: doc._id,
        date: dateNow

      });

      await notice.save();

      return res.json({
        message: `Успешное подтверждение заказа ${doc}`,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Confirm error",
    });
  }
};

export const moderationDelete = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    const date = new Date();
    const dateNow = `${date.toLocaleTimeString()}, ${date.toLocaleDateString()}`;
    if (user.role === "user") {
      return res.status(423).json({
        message: "Нет доступа",
      });
    }

    if (req.body.orderId) {
      const doc = await OrderModel.findOne({ _id: req.body.orderId });

      if (!doc) {
        return res.status(404).json({
          message: "Заказа не существует",
        });
      }

      const notice = await new NotificationModel({
        addresser: doc.customer,
        type: "static",
        message: `Ваш заказ (${doc._id}) не одобрен!`,
        date: dateNow
      });

      await OrderModel.deleteOne({ _id: req.body.orderId })

      await notice.save();

      res.json({
        message: "Заказ отменен",
      });
    } else if (req.body.artId) {
      const doc = await ArtModel.findById(req.body.artId)
      if (!doc) {
        return res.status(404).json({
          message: "Картины не существует",
        });
      }

      const notice = await new NotificationModel({
        addresser: doc.owner,
        type: "static",
        message: `Ваша картина (${doc.title}) не одобрена!`,
        date: dateNow
      });

      await ArtModel.deleteOne({ _id: req.body.artId })

      await notice.save();


      // const doc = await ArtModel.findOneAndDelete({ _id: req.body.artId });
      res.json({
        message: "Картина удалена",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Delete error",
    });
  }
};
