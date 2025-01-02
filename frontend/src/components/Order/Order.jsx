import { useEffect, useState } from "react";
import { Form, Input, Button, Modal, notification } from "antd";
import styles from "./Order.module.scss";
import axios from "../../redux/axios";
import { useNavigate } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "Поле должно быть заполнено",
  types: {
    email: "Некорректный email!",
  },
  string: {
    len: "Должно быть ровно ${len} символов",
  },
};

const PhoneInput = ({ value, onChange }) => {
  const handleChange = (e) => {
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    if (numericValue.length <= 9) {
      onChange(numericValue);
    }
  };

  return (
    <Input
      value={value}
      onChange={handleChange}
      prefix={"+375"}
      placeholder="Введите номер телефона"
    />
  );
};

const Order = ({ isModalOpen, handleCancel, userData, artData }) => {
  const [form] = Form.useForm();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [customer, setCustomer] = useState();

  useEffect(() => {
    if (userData?.data) {
      setEmail(userData.data.email);
      setFullName(userData.data.fullName);
      setCustomer(userData.data._id);
    }
  }, [userData]);

  const onSubmit = (values) => {
    values.customer = customer;
    values.cost = artData.cost;
    values.owner = artData.owner;
    axios
      .post(`/art/${artData._id}`, values)
      .then((res) => {
        notification.success({
          message: "Заказ успешно оформлен",
          description: res.data.message,
        });
        handleCancel;
        nav("/catalog");
      })
      .catch((err) => {
        console.warn(err);
        notification.error({
          message: "Ошибка",
          description: "Произошла ошибка при заказе",
        });
      });
  };

  return (
    <>
      <Modal
        title="Оформление заказа"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          {...layout}
          size="large"
          form={form}
          name="nest-messages"
          onFinish={onSubmit}
          initialValues={{
            customerName: fullName,
            email: email,
          }}
          style={{ maxWidth: 600 }}
          validateMessages={validateMessages}
          className={styles.form}
        >
          <Form.Item
            name={"customerName"}
            label="Имя"
            rules={[{ required: true, message: "Введите ваше имя" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"email"}
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Введите корректный email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"phoneNumber"}
            label="Номер телефона"
            rules={[
              { required: true, message: "Введите номер телефона" },
              {
                pattern: /^[0-9]{9}$/,
                message: "Номер телефона должен содержать 9 цифр",
              },
            ]}
          >
            <PhoneInput />
          </Form.Item>
          <Form.Item
            name={"address"}
            label="Адрес"
            rules={[{ required: true, message: "Введите ваш адрес" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="text" htmlType="submit" className={styles.btn}>
              Отправить
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Order;
