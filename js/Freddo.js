// JavaScript Document

function getURL(ServiceName)
{
	return "http://10.2.0.20:8090/freddoservice.reports.svc/json/"+ServiceName;
}
function ServiceCall(URL,SucessFunctionName,ErrorFunctionName)
{ 
	$.ajax({
		url: URL,
		data: "{}",
		contentType: "application/json; charset=utf-8",
		dataType: "jsonp",
		success:SucessFunctionName,
		error: ErrorFunctionName
	});
}
function onJobBookSucess(data){
	ko.applyBindings({ServiceData:data});
}
function onError(msg){
	alert(msg);
}
function onAuthenticationSucess(data){
	if(data[0].UserID!=null)
	{
	  sessionStorage.UserID=data[0].UserID;
	  sessionStorage.DisplayName=data[0].DisplayName;
	  window.location.href = "Dashboard.html";
	}
	else
	  {
		  $('#txt_UserName').val("");
		  $('#txt_Password').val("");
		  alert("Invalid UserName or Password");
	  }
}
function UserAuthentication(sUserName,sAccessKey)
{
    ServiceName="SelectAllFromUserWhereNameAndKey?sUserName="+sUserName+"& sAccessKey="+sAccessKey;
	ServiceCall(getURL(ServiceName),onAuthenticationSucess,onError);
}
function getJObBook(Rotation)
{
	ServiceName="SelectFewFromJobBook?sRotation="+Rotation;
	ServiceCall(getURL(ServiceName),onJobBookSucess,onError);
}
function getJobStatus(QueueType)
{
	ServiceName="SelectAllJobsFromJobStatus?sQueueType="+QueueType;
	ServiceCall(getURL(ServiceName),onJobBookSucess,onError);
}

function UpdateJobStatus(QueueType,JobIDs,LogIDs)
{
	ServiceName="UpdateJobStatus?sQueueType="+QueueType+"& sJobIDCSV="+JobIDs+"& sLogIDCSV="+LogIDs;
	ServiceCall(getURL(ServiceName),onUpdateSucess,onError);
}
function onUpdateSucess(msg)
{
	$.mobile.showPageLoadingMsg();
	location.reload();
}

