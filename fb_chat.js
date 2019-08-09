console.log('test loaded');


async function formSubmit(event){
    event.preventDefault();
    let newdata_id = '';
    let topic = document.getElementById("topic-content").value;
    // console.log(topic);

    // add data to firestore
    var new_data = {
        'topic': topic,
    };
    await db.collection('questions').add(new_data).then(function(docRef) {
        newdata_id = docRef.id;
    });
    console.log('data added');
    
    // asign input to blank
    document.getElementById("topic-content").value = "";

    // real time add questions
    topicContainer.insertAdjacentHTML("beforeend", `<div id=${newdata_id} class="topic-item">${topic}</div>`);
}

// render data to html
var topicContainer = document.getElementById('topic-container');

db.collection('questions').get().then((snapshot) => {
   // console.log(snapshot);
    snapshot.docs.forEach(doc => {
        console.log(doc.data());
        topicContainer.insertAdjacentHTML("beforeend", `<div id=${doc.id} class="topic-item">${doc.data().topic}</div>`);
    });
});