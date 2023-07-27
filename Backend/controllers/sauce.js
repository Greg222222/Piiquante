const Sauce = require('../models/Sauce')

exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
  
    sauce.save()
    .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
    .catch(error => { res.status(400).json({ error })})
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        if (sauce) {
          res.status(200).json(sauce); // Sauce trouvée, renvoyez-la en réponse
        } else {
          res.status(404).json({ message: "Sauce non trouvée" }); // Aucune sauce trouvée avec l'ID spécifié
        }
      })
      .catch((error) => {
        res.status(500).json({ error: error.message }); // Erreur interne du serveur
      });
  };

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then((sauces) => { res.status(200).json(sauces)})
    .catch((error) => { res.status(400).json({ error: error }) })
}

exports.updateOne = (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({ error }))
}

exports.deleteOne = (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
      .catch(error => res.status(400).json({ error }));
};