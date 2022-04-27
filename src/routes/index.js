// Sección de las rutas disponibles del proyecto
const { Router } = require("express");
const { db } = require("../firebase");
const router = Router();

const getDataDocs = (doc) => {
  const id = doc.id;
  const data = doc.data();
  const { lastname, firstname, email, phone } = data;
  return { id, lastname, firstname, email, phone };
};

router.get("/", async (req, res) => {
  const querySnapShot = await db.collection("contacts").get();
  const contacts = querySnapShot.docs.map(getDataDocs);
  res.render("index", { contacts });
});

router.post("/add-contact", async (req, res) => {
  const { firstname, lastname, email, phone } = req.body;
  if (!firstname || !lastname || !email || !phone) {
    return res.redirect("/");
  }
  const newContact = {
    firstname,
    lastname,
    email,
    phone
  };
  await db.collection("contacts").add(newContact);
  res.redirect("/");
});

router.get("/edit-contact/:id", async (req, res) => {
  const { id } = req.params;
  const doc = await db.collection("contacts").doc(id).get();
  const docData = getDataDocs(doc);
  res.render("index", { userDataToEdit: { docData, id } });
});

router.get("/delete-contact/:id", async (req, res) => {
  const { id } = req.params;
  const deleteDoc = await db.collection("contacts").doc(id).delete();
  res.redirect("/");
});

router.post("/update-contact/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const { firstname, lastname, email, phone } = req.body;
  if (!firstname || !lastname || !email || !phone) {
    return res.redirect("/");
  }
  await db
    .collection("contacts")
    .doc(id)
    .update({ firstname, lastname, email, phone });
  res.redirect("/");
});

module.exports = router;
