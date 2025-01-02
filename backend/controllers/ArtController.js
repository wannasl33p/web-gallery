import ArtModel from '../models/Art.js'


export const getArtAll = async (req, res) => {
    try {
        const arts = await ArtModel.find({
            catalogStatus: "on"
        }).populate('owner').exec();
        const modifiedArts = arts.map(art => { if (art.owner) { art.owner.passwordHash = undefined; art.owner.role = undefined } return art; });

        res.json(modifiedArts);
    } catch (err) {
        return res.status(500).json({
            message: 'Не удалось загрузить контент',
        });
    }
};

export const getArt = async (req, res) => {
    try {
        const artId = req.params.id;
        const art = await ArtModel.findOne(
            {
                _id: artId,

            }).populate('owner').exec();
        if (!art) {
            return res.status(404).json({
                message: 'Не сущестует'
            });
        }
        art.owner.passwordHash = undefined;
        art.owner.role = undefined;

        res.json(art)

    } catch (err) {
        return res.status(500).json({
            message: 'Не удалось загрузить контент',
        });
    }
};

export const addArtwork = async (req, res) => {
    try {
        const doc = await new ArtModel({
            title: req.body.title,
            authorName: req.body.authorName,
            year: req.body.year,
            description: req.body.description,
            artStyle: req.body.artStyle,
            artSubject: req.body.artSubject,
            imagesURL: req.body.imagesURL,
            L: req.body.L,
            B: req.body.B,
            H: req.body.H,
            cost: req.body.cost,
            owner: req.userId,
        });

        const ArtWork = await doc.save();

        res.json(ArtWork);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось добавить"
        })
    }
};

export const deleteArtwork = async (req, res) => {
    try {
        const artId = req.params.id;

        const doc = await ArtModel.findOneAndDelete({ _id: artId });

        if (!doc) {
            return res.status(404).json({
                message: 'Не существует',
            });
        }



        res.json({
            message: 'Удалено',
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Не удалось загрузить контент',
        });
    }
};

export const editArtwork = async (req, res) => {
    try {
        const artId = req.params.id;
        const doc = await ArtModel.findOneAndUpdate({
            _id: artId
        }, {
            $set: {
                title: req.body.title,
                authorName: req.body.authorName,
                year: req.body.year,
                description: req.body.description,
                artStyle: req.body.artStyle,
                artSubject: req.body.artSubject,
                imagesURL: req.body.imagesURL,
                L: req.body.L,
                B: req.body.B,
                H: req.body.H,
                cost: req.body.cost,
            }
        });
        if (!doc) {
            return res.status(400).json({
                message: 'Не удалось найти',
            });
        }
        res.json({
            messege: 'Изменено'
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Не удалось загрузить контент',
        });
    }
};

