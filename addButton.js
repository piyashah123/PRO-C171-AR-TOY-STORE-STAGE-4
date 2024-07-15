AFRAME.registerComponent("create-buttons",{
    init: function(){
        var button1 = document.createElement("button");
        button1.innerHTML = "RATE US";
        button1.setAttribute("id","rating-button");
        button1.setAttribute("class","btn btn-warning");
        
        var button2 =  document.createElement("button");
        button1.innerHTML = "ORDER NOW  ";
        button1.setAttribute("id","Order-button");
        button1.setAttribute("class","btn btn-warning");

        var buttonDiv = document.getElementById("button-div");
        buttonDiv.appendChild(button1);
        buttonDiv.appendChild(button2);
    },
    getAllToys : async function(){
        return await firebase
        .firestore()
        .collection("toys")
        .get()
        .then(snap => {
            return snap.docs.map(doc=>doc.data());
        });
    },
    handleOrder : function(uid , toys){
        firebase
        .firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then(doc => {
            var details = doc.data();
            if (details["current_orders"][toys.id]){
                details["current_orders"][toys.id].quantity += 1;

                var currentQuanity = details["current_ordera"][toys.id][quantity];
                details["current_orders"][toys.id][quantity]["subtotal"] = currentQuanity * toys.price;

            } else {
                details["current_orders"][toys.id] = {
                    item : toy.toy_name,
                    price :toy.price,
                    quantity : 1,
                    subtotal : toy.price *1
                };
            }
            details.total_bill += toy.price;

            firebase
            .firebase()
            .collection("users")
            .doc(doc.id)
            .update(details);
        });
    },
});