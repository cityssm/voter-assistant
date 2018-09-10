<!--#include file="inc/settings.asp"--><!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">

    <title><%=setting_page_title %></title>
  </head>
  <body>
    <header class="navbar navbar-dark bg-primary mb-2">
      <h1 class="navbar-brand mb-0"><%=setting_page_title %></h1>
    </header>
    <div class="container-fluid">
      <div class="row">
        <aside class="col-md-3 bg-light">
          <form id="addressForm">
            <div class="input-group mb-2">
              <div class="input-group-prepend">
                <label class="input-group-text" for="addressForm--query">Address</label>
              </div>
              <input class="form-control" id="addressForm--query" type="text" />
            </div>
          </form>
          <div class="list-group" id="addressResults"></div>
        </aside>
        <main class="col-md-9">
          <article class="pt-2" id="addressDetails" style="display:none">

            <h2 class="clearfix border-bottom mb-2 pb-2">
              <span class="float-left" id="addressDetails--address"></span>
              <span class="float-right">
                <span class="badge badge-info">Ward <span id="addressDetails--ward"></span></span>
                <span class="badge badge-info">Poll <span id="addressDetails--poll"></span></span>
              </span>
            </h2>

            <div class="row">
              <div class="col-md">
                <div id="votingLocations">
                  <h3>Voting Locations</h3>

                  <h4>Election Day</h3>
                  <ul class="list-group" id="votingLocations--electionDay"></ul>

                  <h4>Advanced Vote</h3>
                  <ul class="list-group" id="votingLocations--advanced"></ul>
                </div>
              </div>
              <div class="col-md">
                <div id="candidateList">
                  <h3>Candidates</h3>
                  <ul class="list-group" id="candidateList--listGroups"></ul>
                </div>
              </div>
            </div>
          </article>
        </main>
      </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>

    <script src="js/main.min.js"></script>
  </body>
</html>
