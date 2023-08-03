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

exports.likeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (!sauce) {
        return res.status(404).json({ message: "Sauce non trouvée" });
      }

      if (!sauce.usersLiked.includes(req.auth.userId)) {
        sauce.usersLiked.push(req.auth.userId);
        sauce.likes = sauce.likes + 1;
        const index = sauce.usersDisliked.indexOf(req.auth.userId);
        if (index !== -1) {
          return Promise.reject(new Error('Vous ne pouvez pas liker une sauce que vous avez déjà dislikée.'));
        }
      }

      sauce.save()
        .then(() => res.status(200).json(sauce))
        .catch((error) => res.status(500).json({ error: error.message }));
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};

exports.dislikeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (!sauce) {
        return res.status(404).json({ message: "Sauce non trouvée" });
      }

      if (!sauce.usersDisliked.includes(req.auth.userId)) {
        sauce.usersDisliked.push(req.auth.userId);
        sauce.dislikes = sauce.dislikes + 1;
        const index = sauce.usersLiked.indexOf(req.auth.userId);
        if (index !== -1) {
          sauce.usersLiked.splice(index, 1);
          sauce.dislikes = sauce.dislikes + 1;
        }
      }

      sauce.save()
        .then(() => res.status(200).json(sauce))
        .catch((error) => res.status(500).json({ error: error.message }));
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};

exports.unlikeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (!sauce) {
        return res.status(404).json({ message: "Sauce non trouvée" });
      }

      const index = sauce.usersLiked.indexOf(req.auth.userId);
      if (index !== -1) {
        sauce.usersLiked.splice(index, 1);
        sauce.likes = sauce.likes - 1;
      }

      sauce.save()
        .then(() => res.status(200).json(sauce))
        .catch((error) => res.status(500).json({ error: error.message }));
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};

exports.undislikeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (!sauce) {
        return res.status(404).json({ message: "Sauce non trouvée" });
      }

      const index = sauce.usersDisliked.indexOf(req.auth.userId);
      if (index !== -1) {
        sauce.usersDisliked.splice(index, 1);
        sauce.dislikes = sauce.dislikes - 1;
      }

      sauce.save()
        .then(() => res.status(200).json(sauce))
        .catch((error) => res.status(500).json({ error: error.message }));
    })
    .catch((error) => res.status(500).json({ error: error.message }));
};