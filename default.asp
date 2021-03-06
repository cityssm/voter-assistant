<%@ Language="VBScript" %>
<!--#include file="inc/settings.asp"--><!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Ensure you are on the Voters List.  Find out your candidates and where to vote in the 2018 municipal election.">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">

    <title><%=setting_page_title %></title>

    <style>
      label {
        font-weight: bold;
      }

      button.list-group-item-action {
        cursor: pointer;
      }

      .span-link:hover {
        text-decoration: none;
      }

      .span-link:hover span {
        text-decoration: underline;
      }
    </style>
  </head>
  <body data-county-mun="<%=voterView_countyMun %>">
    <noscript>
      <div class="container my-2">
        <div class="alert alert-danger text-center">
          <strong>This tool requires JavaScript to work.</strong><br />
          Please enable JavaScript and try again.
        </div>
      </div>
    </noscript>
    <div id="siteContainer" role="presentation" style="display:none">
      <header class="navbar navbar-dark bg-dark navbar-expand-md">
        <h1 class="navbar-brand mb-0"><%=setting_page_title %></h1>
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="<%=setting_header_resultsURL %>">
              <i class="fas fa-chart-bar" aria-hidden="true"></i> Election Results</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-toggle="modal" href="#modal--register">
              <i class="fas fa-question-circle" aria-hidden="true"></i> Am I on the Voters List?</a>
          </li>
        </ul>
      </header>
      <main class="container-fluid">
        <div class="row" role="presentation">
          <nav class="col-lg-3 bg-light pt-2">
            <form class="form-group" id="addressForm">
              <label id="addressForm--query-label" for="addressForm--query">Civic Address</label>
              <div class="input-group mb-2">
                <input class="form-control" id="addressForm--query" role="combobox" type="text" autocomplete="off" pattern="^\d.*" aria-autocomplete="inline" aria-owns="addressResults" aria-controls="addressDetails" aria-expanded="false" />
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" id="addressForm--resetBtn" type="reset" title="Reset">
                    <i class="fas fa-fw fa-times"></i>
                    <span class="sr-only">Reset</span>
                  </button>
                </div>
              </div>
            </form>
            <div class="list-group mb-2" id="addressResults" role="listbox" style="min-height:calc(100vh - 56px)" aria-labelledby="addressForm--query-label" aria-multiselectable="false"></div>
          </nav>
          <article class="col-lg-9 mb-2 d-none" id="addressDetails" aria-labelledby="addressDetails--address" aria-live="off" aria-atomic="true" aria-relevant="all">
            <h2 class="clearfix border-bottom py-2 sticky-top bg-white">
              <span class="float-left" id="addressDetails--address"></span>
              <span class="float-right">
                <span class="badge badge-info">Ward <span id="addressDetails--ward"></span></span>
                <span class="badge badge-info">Poll <span id="addressDetails--poll"></span></span>
              </span>
            </h2>
            <div class="row" role="presentation">
              <div class="col-md" role="presentation">
                <section id="votingLocations" aria-labelledby="votingLocations_label">
                  <h3 class="mt-2" id="votingLocations_label">
                    <i class="fas fa-location-arrow" aria-hidden="true"></i> Voting Locations
                  </h3>

                  <h4 class="mt-2" id="votingLocations--electionDay_label">Election Day</h4>
                  <ul class="list-group" id="votingLocations--electionDay" aria-labelledby="votingLocations--electionDay_label"></ul>

                  <h4 class="mt-2" id="votingLocations--advanced_label">Advanced Vote</h4>
                  <ul class="list-group" id="votingLocations--advanced" aria-labelledby="votingLocations--advanced_label"></ul>
                </section>
              </div>
              <div class="col-md" role="presentation">
                <section id="candidateList" aria-labelledby="candidateList_label">
                  <h3 class="mt-2" id="candidateList_label">
                    <i class="fas fa-users" aria-hidden="true"></i> Candidates
                  </h3>
                  <div id="candidateList--listGroups" role="presentation"></div>
                </section>
              </div>
            </div>
          </article>
        </div>
      </main>
      <footer class="bg-dark">
        <div class="container-fluid py-3 text-white text-right" role="presentation">
          <%=setting_footer_html %>
        </div>
      </footer>

      <div class="modal" id="modal--register">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-body">
              <iframe id="register--iframe" frameborder="0" style="width:100%;height:100vh"></iframe>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    <script src="https://www.voterview.ca/mvvframes/v2/scripts/iframeResizer.min.js" async></script>
    <script src="js/main.min.js"></script>

  </body>
</html>
