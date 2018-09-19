/* global window, document, iFrameResize */


$(document).ready(function() {
  "use strict";

  let addressLoaded = false;

  const addressForm_queryEle = document.getElementById("addressForm--query");
  const addressForm_resetBtn = document.getElementById("addressForm--resetBtn");

  const addressResultsEle = document.getElementById("addressResults");
  const addressDetailsEle = document.getElementById("addressDetails");

  const loadingHTML = "Loading... <i class=\"fas fa-spinner fa-pulse\"></i>";
  const listGroupItem_loadingHTML = "<li class=\"list-group-item\">" + loadingHTML + "</li>";

  const digitRegExp = /\d/;

  //http://davidwalsh.name/javascript-debounce-function
  function debounce(func, wait, immediate) {
    let timeout;
    return function() {
      let context = this,
        args = arguments;
      let later = function() {
        timeout = null;
        if (!immediate) {
          func.apply(context, args);
        }
      };
      let callNow = immediate && !timeout;
      window.clearTimeout(timeout);
      timeout = window.setTimeout(later, wait);
      if (callNow) {
        func.apply(context, args);
      }
    };
  }


  let addressForm_query_current = "";


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
    //const buttonEle_streetName = buttonEle.getAttribute("data-street-name");
    const buttonEle_streetNameFull = buttonEle.getAttribute("data-street-name-full");
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

      const googleMapUrl_root = "https://www.google.com/maps/dir/" + encodeURIComponent(buttonEle_address) + "/";

      $.get("voterView.asp", {
          "method": "find_voting_locations",
          "streetNumber": buttonEle_streetNumber,
          "streetName": buttonEle_streetNameFull
        }, "json")
        .done(function(json) {

          votingLocations_advanced_ele.innerHTML = "";

          if (json.length === 0) {
            votingLocations_electionDay_ele.innerHTML = "<li class=\"list-group-item list-group-item-warning\">No voting location found.</li>";

          } else {
            votingLocations_electionDay_ele.innerHTML = "";

            json.forEach(function(votingLocationJSON) {

              let googleMapUrl = googleMapUrl_root +
                encodeURIComponent(votingLocationJSON.Address1 + ", " +
                  votingLocationJSON.City + ", " +
                  votingLocationJSON.Province + " " +
                  votingLocationJSON.PostalCode);

              let votingLocationHTML = "<li class=\"list-group-item\">" +
                "<div class=\"row\">" +
                ("<div class=\"col-sm\">" +
                  votingLocationJSON.DateOpenStringLocal + "<br />" +
                  votingLocationJSON.StartTime + " to " + votingLocationJSON.EndTime +
                  "</div>") +
                ("<div class=\"col-sm\">" +
                  (votingLocationJSON.LocationName === "" ? "" : votingLocationJSON.LocationName + "<br />") +
                  "<a href=\"" + googleMapUrl + "\" title=\"Find this Location\" target=\"_blank\">" +
                  votingLocationJSON.Address1 +
                  "</a>" +
                  (votingLocationJSON.Address2 === "" ? "" : "<br />" + votingLocationJSON.Address2) +
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

    /*
     * Hide other buttons from results
     */

    addressResultsEle.classList.add("d-none");

    addressForm_queryEle.value = buttonEle_address;
    addressForm_query_current = buttonEle_address.toLowerCase();

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

    const query = addressForm_queryEle.value.trim().toLowerCase();

    if (query === "") {

      addressForm_query_current = query;

      addressResultsEle.innerHTML = "<div class=\"list-group-item list-group-item-info\">" +
        "To get started, enter your address." +
        "</div>";

      return;

    } else if (addressForm_query_current !== query) {

      addressForm_query_current = query;

      if (!digitRegExp.test(query.charAt(0))) {
        addressResultsEle.innerHTML = "<div class=\"list-group-item list-group-item-danger\">" +
          "Be sure to use a complete residential address with the civic number first." +
          "</div>";
        return;
      }

      const resetBtn_iconEle = addressForm_resetBtn.getElementsByTagName("i")[0];
      resetBtn_iconEle.classList.add("fa-spinner");
      resetBtn_iconEle.classList.remove("fa-times");
      resetBtn_iconEle.classList.add("fa-pulse");

      $.get("voterView.asp", {
          "method": "street_addresses",
          "query": query
        }, "json")
        .done(function(json) {

          const noResultsHTML = "<div class=\"list-group-item list-group-item-danger\">" +
            "<strong>There are no addresses available.</strong><br />" +
            "Be sure to use a complete residential address with the civic number first." +
            "</div>";

          if (json.length === 0) {
            addressResultsEle.innerHTML = noResultsHTML;

          } else {

            let resultsDisplayed = false;

            addressResultsEle.innerHTML = json.reduce(function(soFar, addressJSON) {

              if (addressJSON.StreetNumber === null) {
                return soFar;
              }

              resultsDisplayed = true;

              const streetNameFull = (addressJSON.StreetName + " " +
                addressJSON.StreetType + " " +
                addressJSON.StreetDirection).trim();

              return soFar + "<button class=\"list-group-item list-group-item-action\"" +
                " data-address=\"" + addressJSON.Address + "\"" +
                " data-street-number=\"" + addressJSON.StreetNumber + "\"" +
                " data-street-name=\"" + addressJSON.StreetName + "\"" +
                " data-street-name-full=\"" + streetNameFull + "\"" +
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

            if (resultsDisplayed) {

              const buttonEles = addressResultsEle.getElementsByTagName("button");

              let index;
              for (index = 0; index < buttonEles.length; index += 1) {
                buttonEles[index].addEventListener("click", selectAddress);
              }

            } else {
              addressResultsEle.innerHTML = noResultsHTML;
            }
          }

          resetBtn_iconEle.classList.remove("fa-pulse");
          resetBtn_iconEle.classList.add("fa-times");
          resetBtn_iconEle.classList.remove("fa-spinner");
        })
        .fail(function() {
          try {
            // eslint-disable-next-line no-console
            window.console.log("An error occurred communicating with VoterView.");
          } catch (e) {
            // ignore
          }

        });
    }
  }

  /*
   * Initialize address search form
   */

  document.getElementById("addressForm").addEventListener("submit", function(formEvent) {
    formEvent.preventDefault();
  });


  addressForm_resetBtn.addEventListener("click", function(buttonEvent) {
    buttonEvent.preventDefault();
    addressForm_queryEle.value = "";
    addressForm_queryEle.focus();
    getAddresses();
  });


  addressForm_queryEle.addEventListener("focus", function() {
    addressResultsEle.classList.remove("d-none");

    if (addressLoaded) {
      addressDetailsEle.classList.add("d-lg-block");
    }

    addressDetailsEle.classList.add("d-none");
  });


  addressForm_queryEle.addEventListener("input", function() {

    const valueToTest = addressForm_queryEle.value.trim();

    try {
      if (valueToTest.length === 0 || digitRegExp.test(addressForm_queryEle.value.charAt(0))) {
        addressForm_queryEle.setCustomValidity("");
      } else {
        addressForm_queryEle.setCustomValidity("Addresses should include civic number first.");
      }
    } catch (e) {
      //ignore
    }
  });


  addressForm_queryEle.addEventListener("keyup", debounce(getAddresses, 200));


  getAddresses();

  /*
   * Make site visible
   */

  document.getElementById("siteContainer").style.display = "block";


  /*
   * Initialize register modal
   */

  $("#modal--register").on("show.bs.modal", function() {
    const iframeEle = document.getElementById("register--iframe");
    iframeEle.setAttribute("src", "https://vrp.voterview.ca/g/" + document.body.getAttribute("data-county-mun"));
    try {
      iFrameResize();
    } catch (e) {
      // ignore
    }
  });
});
