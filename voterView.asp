<!--#include file="inc/settings.asp"--><%

requestParameters = ""

if (request.querystring("method") = "street_addresses") then

  requestParameters = "query=" & Server.URLEncode(request.querystring("query"))

else
  response.status = "403 Forbidden"
  response.end

end if

Set http = Server.CreateObject("MSXML2.ServerXMLHTTP")
'http.setOption 2, 13056

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
