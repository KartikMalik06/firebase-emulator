const admin = require("firebase-admin");
const fs = require("fs");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  projectId: "project-id",
});

const firestore = admin.firestore();

const data = JSON.parse(fs.readFileSync("firestore.json", "utf8"));

async function uploadData() {
  for (const [collectionName, documents] of Object.entries(data)) {
    const collectionRef = firestore.collection(collectionName);
    for (const [docId, docData] of Object.entries(documents)) {
      await collectionRef.doc(docId).set(docData);
      console.log(
        `Uploaded document: ${docId} to collection: ${collectionName}`
      );
    }
  }
}

uploadData()
  .then(() => {
    console.log("Data upload complete!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error uploading data:", error);
    process.exit(1);
  });
