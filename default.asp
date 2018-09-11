<%@ Language="VBScript" %>
<!--#include file="inc/settings.asp"--><!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">

    <title><%=setting_page_title %></title>

    <style>
      button.list-group-item-action {
        cursor: pointer;
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
    <div id="siteContainer" style="display:none">
      <header class="navbar navbar-dark bg-primary">
        <h1 class="navbar-brand mb-0"><%=setting_page_title %></h1>
        <div class="navbar-nav ml-auto">
          <a class="btn btn-lg btn-secondary" data-toggle="modal" href="#modal--register">
            <i class="fas fa-question-circle"></i> Am I on the Voters List?</a>
        </div>
      </header>
      <div class="container-fluid">
        <div class="row">
          <aside class="col-lg-3 bg-light pt-2">
            <form id="addressForm">
              <div class="input-group mb-2">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="addressForm--query">Address</label>
                </div>
                <input class="form-control" id="addressForm--query" type="text" autocomplete="off" />
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" id="addressForm--resetBtn" type="button">
                    <span class="fas fa-times"></span>
                    <span class="sr-only">Reset</span>
                  </button>
                </div>
              </div>
            </form>
            <div class="list-group mb-2" id="addressResults" style="min-height:calc(100vh - 56px)"></div>
          </aside>
          <main class="col-lg-9">
            <article class="mb-2 d-none" id="addressDetails">

              <h2 class="clearfix border-bottom py-2 sticky-top bg-white">
                <span class="float-left" id="addressDetails--address"></span>
                <span class="float-right">
                  <span class="badge badge-info">Ward <span id="addressDetails--ward"></span></span>
                  <span class="badge badge-info">Poll <span id="addressDetails--poll"></span></span>
                </span>
              </h2>

              <div class="row">
                <div class="col-md">
                  <section id="votingLocations">
                    <h3 class="mt-2">
                      <i class="fas fa-location-arrow"></i> Voting Locations
                    </h3>

                    <h4 class="mt-2">Election Day</h4>
                    <ul class="list-group" id="votingLocations--electionDay"></ul>

                    <h4 class="mt-2">Advanced Vote</h4>
                    <ul class="list-group" id="votingLocations--advanced"></ul>
                  </section>
                </div>
                <div class="col-md">
                  <section id="candidateList">
                    <h3 class="mt-2">
                      <i class="fas fa-users"></i> Candidates
                    </h3>
                    <div id="candidateList--listGroups"></div>
                  </section>
                </div>
              </div>
            </article>
          </main>
        </div>
      </div>
      <footer class="bg-dark">
        <div class="container-fluid py-3 text-white text-right">
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
    <script src="https://www.voterview.ca/mvvframes/v2/scripts/iframeResizer.min.js"></script>
    <script src="js/main.min.js"></script>

  </body>
</html>
