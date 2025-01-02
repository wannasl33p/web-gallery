import jwt from 'jsonwebtoken';



export default async (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {
        try {
            const jwi_decoded = jwt.verify(token, 'keyword');
            req.userId = jwi_decoded._id;
            next();

        } catch (err) {
            console.log(err)
            return res.status(403).json({
                messege: "Ошибка"
            });
        }

    } else {
        return res.status(405).json({
            messege: "Ошибка"
        });
    }

};