var express = require("express");
var cors=require("cors");
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://admin:1EPPUCKaA4ReZEKT@cluster0.bnfaywx.mongodb.net/csdledb?retryWrites=true&w=majority&appName=Cluster0";
const bodyParser = require('body-parser');

var app = express();
app.use(cors());



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

mongoose.connect(uri)
  .then(() => {
    app.listen(3000, () => console.log('Serveur démarré et connecté à MongoDB'));
  })
  .catch(err => {
    console.error('Impossible de se connecter à MongoDB:', err);
  });


// Définition du schéma
const playerSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  player: String,
  age: Number,
  nationality: String,
  role: String,
  team: String,
  active: Boolean,
  major: Number
});

// Création du modèle
const PlayerModel = mongoose.model('PlayerModel', playerSchema, 'csdlecollection');
app.use(bodyParser.json());

// Fonction pour récupérer tous les joueurs
async function getAllPlayers() {
  try {
    const players = await PlayerModel.find({}); //Find récupère tout les joueurs sans filtre spéciale
    return players; // Retourne les joueurs trouvés
  } catch (error) {
    console.error("Erreur lors de la récupération des joueurs :", error);
    throw error; // Propage l'erreur pour une gestion ultérieure
  }
}

// Définition de la route
app.get('/api/csdleapp/GetPlayers', async (req, res) => {
  try {
    const players = await getAllPlayers();
    res.json(players); // Envoyer les joueurs en réponse
  } catch (error) {
    res.status(500).send("Erreur interne du serveur");
  }
});

// Route pour ajouter un joueur
app.post('/api/csdleapp/AddPlayers', async (req, res) => {
  try {

    // Créer un nouveau document à partir du modèle PlayerModel
    const newPlayer = new PlayerModel(req.body);

    // Sauvegarder le nouveau joueur dans la base de données
    await newPlayer.save();

    // Envoyer une réponse de succès avec le joueur créé
    res.status(201).send(newPlayer);
  } catch (error) {
    console.error("Erreur lors de l'ajout d'un nouveau joueur :", error);
    res.status(500).send("Erreur interne du serveur");
  }
});

// Route pour delete un joueur
app.delete('/api/csdleapp/DeletePlayer/:id', async (req, res) => {
  const { id } = req.params; // Extraction de l'ID du joueur à partir des paramètres d'URL
  console.log(id)

  try {
    // Tentative de suppression du joueur en utilisant son ID
    const result = await PlayerModel.findByIdAndDelete(id);

    if (result) {
      // Si le joueur a été trouvé et supprimé, renvoyez un succès
      res.status(200).json({ message: "Joueur supprimé avec succès", deletedPlayer: result });
    } else {
      // Si aucun joueur correspondant à l'ID n'a été trouvé
      res.status(404).json({ message: "Joueur non trouvé" });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du joueur :", error);
    res.status(500).json({ message: "Erreur interne du serveur" });
  }
});

