/* global window, document */


(function() {
  "use strict";

  const addressForm_queryEle = document.getElementById("addressForm--query");

  function selectAddress (buttonEvent) {

    buttonEvent.preventDefault();

    const buttonEle = buttonEvent.currentTarget;

    const button_address = buttonEle.getAttribute("data-address");
    const button_ward = buttonEle.getAttribute("data-ward");
    const button_poll = buttonEle.getAttribute("data-poll");

    const addressDetailsEle = document.getElementById("addressDetails");

    addressDetailsEle.getElementsByTagName("h2")[0].innerText = button_address;


    addressDetailsEle.style.display = "block";
  }

  function getAddresses() {

    const resultsListEle = document.getElementById("addressResults");

    const query = addressForm_queryEle.value;

    if (query.length === 0) {
      resultsListEle.innerHTML = "<div class=\"list-group-item list-group-item-info\">" +
        "To get started, enter your address." +
        "</div>";

      return;
    }

    $.get("voterView.asp", {
        "dataType": "json",
        "method": "street_addresses",
        "query": query
      })
      .done(function(json) {

        if (json.length === 0) {
          resultsListEle.innerHTML = "<div class=\"list-group-item list-group-item-danger\">" +
            "There are no addresses available." +
            "</div>";

        } else {

          resultsListEle.innerHTML = json.reduce(function(soFar, addressJSON) {
            return soFar + "<button class=\"list-group-item list-group-item-action\"" +
              " data-address=\"" + addressJSON.Address + "\"" +
              " data-ward=\"" + addressJSON.Ward + "\"" +
              " data-poll=\"" + addressJSON.PollAndSuffix + "\"" +
              " type=\"button\">" +

              "<div class=\"clearfix\">" +
              "<strong class=\"float-left\">" + addressJSON.Address + "</strong>" +
              ("<small class=\"float-right text-right\">" +
                "Ward " + addressJSON.Ward + "<br />" +
                "Poll " + addressJSON.PollAndSuffix +
                "</small>") +
              "</div>" +

              "</button>";
          }, "");

          const buttonEles = resultsListEle.getElementsByTagName("button");

          let index;
          for (index = 0; index < buttonEles.length; index += 1) {
            buttonEles[index].addEventListener("click", selectAddress);
          }
        }
      })
      .fail(function() {
        // eslint-disable-next-line no-alert
        window.alert("An error occurred communicating with VoterView.  Please refresh your browser and try again.");
      });
  }

  addressForm_queryEle.addEventListener("keyup", function(inputEvent) {
    inputEvent.preventDefault();
    getAddresses();
  });

  getAddresses();
}());
