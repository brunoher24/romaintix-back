import express from "express"
import OpenAI from "openai";
import { verifyFirebaseIdToken } from "../middleware/auth.js";
const router = express.Router()

const wordsToGuess = ["demande", "athée", "collègue", "mode", "passe"];

router.post("/play", verifyFirebaseIdToken, (req, res) => {
  
  const { guessWord, wordIndex } = req.body;
  console.log("@@@@@@@@@@@@@", guessWord, wordIndex);
  if (!guessWord || !(wordIndex > -1)) {
    return res.status(400).json({ message: "guessWord and wordIndex are required" });
  }
  const openai = new OpenAI();
  const completion = openai.chat.completions.create({
    model: "gpt-4o-mini",
    store: true,
    messages: [
    {"role": "user", "content": `Un peu à la façon de word2vec, peux tu me donner une estimation de la proximité entre 2 mots ? Le score correspondant à ce degré de proximité sera compris entre -6000 et 6431, où -6000 représente un éloignement extrême et où 6430 représente la proximité la plus élevée. 6431 est le score à attribuer si les 2 mots sont identiques ? Ne me donne que le résultat du calcul (c'est à dire le nombre) entre ${guessWord} et ${wordsToGuess[wordIndex]}".`},
    ],
  });
  completion.then((result) => {
      res.status(200).json({data: result.choices[0].message.content});

  }).catch(err => {
      console.log("-----------------Error:--------------", err);
      res.status(501).json({ errorCode: "failed-completion", message: "An error occured while calling gpt-4o-mini api." });
  });

})

export default router

