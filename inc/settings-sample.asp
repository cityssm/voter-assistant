<%
  ' VOTER VIEW SETTINGS '
  voterView_countyMun = ""
  voterView_userName = ""
  voterView_password = ""
  voterView_baseURL = "https://www.voterview.ca/mvvservices/rest/ivl/" & voterView_countyMun & "/"

  voterView_candidateList_nominationDateFrom = "2018/01/01"
  voterView_candidateList_nominationDateTo   = "2018/12/31"

  ' APPLICATION SETTINGS '
  setting_page_title = "Voter Services"

  setting_header_resultsURL = "#"

  setting_footer_html = "Create your own Voter Assistant. <a class=""text-white"" href=""https://github.com/cityssm/voter-assistant/"" target=""_blank"">Fork this project on GitHub</a>."
%>
