/* global window, document */


(function() {
  "use strict";

  let addressLoaded = false;

  const addressForm_queryEle = document.getElementById("addressForm--query");
  const addressResultsEle = document.getElementById("addressResults");
  const addressDetailsEle = document.getElementById("addressDetails");

  const loadingHTML = "Loading... <i class=\"fas fa-spinner fa-spin\"></i>";
  const listGroupItem_loadingHTML = "<li class=\"list-group-item\">" + loadingHTML + "</li>";

  function selectAddress(buttonEvent) {

    buttonEvent.preventDefault();

    /*
     * Hide the content
     */

    addressDetailsEle.classList.add("d-none");

    /*
     * Get data from button
     */

    const buttonEle = buttonEvent.currentTarget;

    const buttonEle_address = buttonEle.getAttribute("data-address");

    const buttonEle_streetNumber = buttonEle.getAttribute("data-street-number");
    const buttonEle_streetName = buttonEle.getAttribute("data-street-name");
    const buttonEle_ward = buttonEle.getAttribute("data-ward");
    const buttonEle_poll = buttonEle.getAttribute("data-poll");

    /*
     * Display address information
     */

    document.getElementById("addressDetails--address").innerText = buttonEle_address;
    document.getElementById("addressDetails--ward").innerText = buttonEle_ward;
    document.getElementById("addressDetails--poll").innerText = buttonEle_poll;

    /*
     * Get voting locations
     */

    {
      const votingLocations_electionDay_ele = document.getElementById("votingLocations--electionDay");
      votingLocations_electionDay_ele.innerHTML = listGroupItem_loadingHTML;

      const votingLocations_advanced_ele = document.getElementById("votingLocations--advanced");
      votingLocations_advanced_ele.innerHTML = listGroupItem_loadingHTML;

      $.get("voterView.asp", {
          "method": "find_voting_locations",
          "streetNumber": buttonEle_streetNumber,
          "streetName": buttonEle_streetName
        }, "json")
        .done(function(json) {

          votingLocations_advanced_ele.innerHTML = "";

          if (json.length === 0) {
            votingLocations_electionDay_ele.innerHTML = "<li class=\"list-group-item list-group-item-warning\">No voting location found.</li>";

          } else {
            votingLocations_electionDay_ele.innerHTML = "";

            json.forEach(function(votingLocationJSON) {

              let votingLocationHTML = "<li class=\"list-group-item\">" +
                "<div class=\"row\">" +
                ("<div class=\"col-sm\">" +
                  votingLocationJSON.DateOpenStringLocal + "<br />" +
                  votingLocationJSON.StartTime + " to " + votingLocationJSON.EndTime +
                  "</div>") +
                ("<div class=\"col-sm\">" +
                  votingLocationJSON.LocationName + "<br />" +
                  votingLocationJSON.Address1 +
                  "</div>") +
                "</div>" +
                "</li>";

              if (votingLocationJSON.IsAdvancePoll) {
                votingLocations_advanced_ele.insertAdjacentHTML("beforeend", votingLocationHTML);

              } else {
                votingLocations_electionDay_ele.insertAdjacentHTML("beforeend", votingLocationHTML);

              }
            });
          }
        });
    }

    /*
     * Get candidate list
     */

    {
      const candidateList_listGroups_ele = document.getElementById("candidateList--listGroups");
      candidateList_listGroups_ele.innerHTML = "<p>" + loadingHTML + "</p>";

      const reduceFn_candidate = function(soFar, candidateJSON) {
        return soFar + "<li class=\"list-group-item\">" + candidateJSON.CandidateName + "</li>";
      };

      $.get("voterView.asp", {
          "method": "candidate_list",
          "ward": buttonEle_ward
        }, "json")
        .done(function(json) {

          candidateList_listGroups_ele.innerHTML = json.Positions.reduce(function(soFar, positionJSON) {

            return soFar + "<h4 class=\"clearfix mt-2\">" +
              "<span class=\"float-left\">" + positionJSON.PositionName + "</span>" +
              " <small class=\"float-right\">" +
              "<span class=\"badge badge-secondary\">" +
              positionJSON.Candidates.length + " candidate" + (positionJSON.Candidates.length === 1 ? "" : "s") +
              "</span>" +
              " <span class=\"badge badge-secondary\">" +
              positionJSON.NumberPositions + " position" + (positionJSON.NumberPositions === 1 ? "" : "s") +
              "</span>" +
              "</small>" +
              "</h4>" +
              "<ul class=\"list-group\">" + positionJSON.Candidates.reduce(reduceFn_candidate, "") + "</ul>";
          }, "");
        });
    }

    /*
     * Show the content
     */

    addressLoaded = true;

    addressDetailsEle.classList.remove("d-none");
    addressDetailsEle.classList.remove("d-sm-none");
    addressDetailsEle.classList.remove("d-xs-none");

    /*
     * Hide other buttons from results
     */

    addressResultsEle.classList.add("d-none");

    addressForm_queryEle.value = buttonEle_address;

    const buttonEles = addressResultsEle.getElementsByTagName("button");
    let buttonIndex;

    for (buttonIndex = 0; buttonIndex < buttonEles.length; buttonIndex += 1) {
      if (buttonEles[buttonIndex].getAttribute("data-address") !== buttonEle_address) {
        buttonEles[buttonIndex].outerHTML = "";
        buttonIndex -= 1;
      }
    }
  }

  function getAddresses() {

    const query = addressForm_queryEle.value;

    if (query.length === 0) {
      addressResultsEle.innerHTML = "<div class=\"list-group-item list-group-item-info\">" +
        "To get started, enter your address." +
        "</div>";

      return;
    }

    $.get("voterView.asp", {
        "method": "street_addresses",
        "query": query
      }, "json")
      .done(function(json) {

        if (json.length === 0) {
          addressResultsEle.innerHTML = "<div class=\"list-group-item list-group-item-danger\">" +
            "There are no addresses available." +
            "</div>";

        } else {

          addressResultsEle.innerHTML = json.reduce(function(soFar, addressJSON) {
            return soFar + "<button class=\"list-group-item list-group-item-action\"" +
              " data-address=\"" + addressJSON.Address + "\"" +
              " data-street-number=\"" + addressJSON.StreetNumber + "\"" +
              " data-street-name=\"" + addressJSON.StreetName + "\"" +
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

          const buttonEles = addressResultsEle.getElementsByTagName("button");

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

  /*
   * Initialize address search form
   */

  addressForm_queryEle.addEventListener("focus", function() {
    addressResultsEle.classList.remove("d-none");

    if (addressLoaded) {
      addressDetailsEle.classList.add("d-md-block");
      addressDetailsEle.classList.add("d-lg-block");
      addressDetailsEle.classList.add("d-xl-block");
    }

    addressDetailsEle.classList.add("d-sm-none");
    addressDetailsEle.classList.add("d-xs-none");
  });

  addressForm_queryEle.addEventListener("keyup", function(inputEvent) {
    inputEvent.preventDefault();
    getAddresses();
  });

  getAddresses();

  /*
   * Initialize register modal
   */

  $("#modal--register").on("show.bs.modal", function() {
    document.getElementById("register--iframe").setAttribute("src", "https://vrp.voterview.ca/g/" + document.body.getAttribute("data-county-mun"));
  });
}());
