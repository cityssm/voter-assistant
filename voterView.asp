<%@ Language="VBScript" %><!--#include file="inc/settings.asp"--><%

  requestParameters = ""

  if (request.querystring("method") = "street_addresses") then
    requestParameters = "query=" & Server.URLEncode(request.querystring("query"))

  elseif (request.querystring("method") = "find_voting_locations") then
    requestParameters = "streetNumber=" & Server.URLEncode(request.querystring("streetNumber")) & _
      "&streetName=" & Server.URLEncode(request.querystring("streetName"))

  elseif (request.querystring("method") = "candidate_list") then
    requestParameters = "ward=" & Server.URLEncode(request.querystring("ward")) & _
      "&nominationDateFrom=" & voterView_candidateList_nominationDateFrom & _
      "&nominationDateTo=" & voterView_candidateList_nominationDateTo

  else
    response.status = "403 Forbidden"
    response.end

  end if

  Set http = Server.CreateObject("MSXML2.ServerXMLHTTP")

  http.Open "GET", _
    voterView_baseURL & request.querystring("method") & "?" & requestParameters, _
    False, _
    voterView_userName, _
    voterView_password

  http.send

  response.expires = 60
  response.contentType = "application/json"

  response.write http.responseText
%>
