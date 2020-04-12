const cafeList = document.querySelector("#cafe-list");
const form = document.querySelector("#add-cafe-form");

// create element and render cafe

const renderCafe = (doc) => {
  const cafeItem = `
    <li data-id=${doc.id}>
    <span>${doc.data().name}</span>
    <span>${doc.data().city}</span>
    <div>x</div>
    </li>
    `;
  cafeList.innerHTML += cafeItem;
};

//getting data from database firestore
// db.collection("cafes")
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       renderCafe(doc);
//     });
//   });

// add new items to firestore on form submit event
form.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("cafes")
    .add({
      name: form.name.value,
      city: form.city.value,
    })
    .then(() => {
      form.name.value = "";
      form.city.value = "";
    });
});

// delete from database
cafeList.addEventListener("click", (e) => {
  if (e.target.textContent === "x") {
    const id = e.target.parentElement.getAttribute("data-id");
    db.collection("cafes").doc(id).delete();
  }
});

// query data from database firestore
// db.collection("cafes")
//   .where("city", "==", "Barcelona")
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       renderCafe(doc);
//     });
//   });

// ordering data from database firestore
// db.collection("cafes")
//   .orderBy("name")
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       renderCafe(doc);
//     });
//   });

// complex query data from database firestore. keep in mind that this requires indexing your fields
// db.collection("cafes")
//   .where("city", "==", "Barcelona")
//   .orderBy("name")
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       renderCafe(doc);
//     });
//   });

// realtime data listner from database firestore
db.collection("cafes").onSnapshot((snapshot) => {
  const changes = snapshot.docChanges();
  changes.forEach((change) => {
    if (change.type === "added") {
      renderCafe(change.doc);
    } else if (change.type === "removed") {
      const li = document.querySelector(`[data-id=${change.doc.id}]`);
      li.remove();
    }
  });
});


// example update a doc in firestore
// db.collection("cafes").doc(doc-id).update({
//     //  here change the doc data by changing the value of the keys
// })


// example overwrite a doc in firestore
// db.collection("cafes").doc(doc-id).set({
//     //  here overwrite the doc data by changing the value of the keys
// })