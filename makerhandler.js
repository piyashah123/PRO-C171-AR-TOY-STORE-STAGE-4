AFRAME.registerComponent("markerhandler",{
    init: function(){
        this.el.addEventListener("markerFound",() => {
            console.log("marker is found");
            this.handleMarkerFound();
        });
        this.el.addEventListener("markerLost",() => {
            console.log("marker is lost");
            this.handleMarkerLost();
        });
    },
    handleMarkerFound: function(){
        var buttonDiv = document.getElementById("button-div");
        buttonDiv.style.display = "flex";

        var orderButton = document.getElementById("order-button");
        var orderSummaryButton = document.getElementById("order-summary-button");
        
        orderButton.addEventListener("click", () => {
            swal({
                icon: "https://i.imgur.com/4NZ6uLY.jpg",
                title: "Thanks for ordering!",
                text: "Your order will be served soon",
                timer:2000,
                button:false
            });
        });
        orderSummaryButton.addEventListener("click", () =>
        {
            swal({
                icon: "warning",
                title: "Order Summary",
                text: "Work in progress",
            });

        });
    },
    getAllToys : async function(){
        return await firebase
        .firestore()
        .collection("toys")
        .get()
        .then(snap => {
            return snap.docs.map(doc=>doc.data());
        });
    }

})