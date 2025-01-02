import ArtModel from "../models/Art.js";
import UserModel from "../models/User.js";
import OrderModel from "../models/Order.js";
import NotificationModel from "../models/Notification.js";
import Art from "../models/Art.js";

export const createOrder = async (req, res) => {
  try {
    const customer = await UserModel.findById(req.body.customer);
    const artId = req.params.id;
    const owner = req.body.owner;

    if (!customer) {
      const doc = new OrderModel({
        artId: artId,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        owner: owner,
        cost: req.body.cost,
        customerName: req.body.customerName,
        email: req.body.email
      });
      await doc.save();


    }
    else {
      const doc = await new OrderModel({
        artId: artId,
        customer: req.body.customer,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        owner: owner,
        cost: req.body.cost,
        customerName: req.body.customerName,
        email: req.body.email
      });

      await doc.save()

      const notice = await new NotificationModel({
        addresser: doc.customer,
        type: "static",
        message: `Ваш заказ на картину (${req.params.id}) был отправлен. Ожтдайте ответа`
      });
      await notice.save();
    }

    return res.json({
      message: "Ваш заказ был отправлен на модерацию, ожидайте ответа",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      messege: "Order Error",
    });
  }
};
