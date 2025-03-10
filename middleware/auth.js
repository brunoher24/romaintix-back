import admin from "../firebase-config.js";

// Application d'un middleware qui sécurisera toutes les routes
export const verifyFirebaseIdToken = (req, res, next) => {
  try {
    // Récupération du token dans le header de la requête (deuxième élément du tableau)
    const token = req.headers.authorization.split(' ')[1];
    // Vérification du TOKEN décodé
    const decodedToken = admin.auth().verifyIdToken(token);
    // Vérification de correspondance entre le userId de la requête et celui encodé par le TOKEN
    decodedToken.then(res => {
        next(); // si tout est ok, on passe au prochain middleware
    }).catch(err => {
        console.log("---------------UNAUTHORIZED-----------------", token, err);
        res.status(401).json({
          error: new Error('Invalid token!')
        });
    });
  } catch(err) {
    console.log("--------------------------------", err);
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};