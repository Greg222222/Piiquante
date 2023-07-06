const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user')

mongoose.connect('mongodb+srv://greggire:CxztcikHrnl7PCaz@cluster0.vtjunqf.mongodb.net/ ',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !')); 


const app = express();
app.use(express.json());


  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //Permet d'accéder à notre API depuis n'importe quelle origine ( '*' ) à changer une fois déployée
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // Permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next(); 
})

app.use('/api/auth', userRoutes)


module.exports = app;