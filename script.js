$("#studentId").focus();
function validateAndGetFormData() {
  var studentIdVar = $("#studentId").val();
  if (studentIdVar === "") {
    alert("Student ID Required Value");
    $("#studentId").focus();
    return "";
  }
  var studentNameVar = $("#studentName").val();
  if (studentNameVar === "") {
    alert("Student Name is Required Value");
    $("#studentName").focus();
    return "";
  }
  var studentEmailVar = $("#studentEmail").val();
  if (studentEmailVar === "") {
    alert("Student Email is Required Value");
    $("#studentEmail").focus();
    return "";
  }
  var studentMobileVar = $("#studentMobileNo").val();
  if (studentMobileVar === "") {
    alert("Student Mobile Number is Required Value");
    $("#studentMobileNo").focus();
    return "";
  }
  let jsonStrObj = {
    id: studentIdVar,
    name: studentNameVar,
    email: studentEmailVar,
    mobileno: studentMobileVar,
  };
  return JSON.stringify(jsonStrObj);
}

function resetForm() {
  $("#studentId").val("");
  $("#studentName").val("");
  $("#studentEmail").val("");
  $("#studentMobileNo").val("");
  $("#studentId").focus();
}

//save student
function saveStudent() {
  let jsonStr = validateAndGetFormData();
  if (jsonStr === "") {
    return;
  }
  var putReqStr = createPUTRequest(
    "90937372|-31949298369836093|90943278",
    jsonStr,
    "Student",
    "Student-Rel"
  );
  alert(putReqStr);
  jQuery.ajaxSetup({ async: false });
  var resultObj = executeCommandAtGivenBaseUrl(
    putReqStr,
    "http://api.login2explore.com:5577",
    "/api/iml"
  );
  alert(JSON.stringify(resultObj));
  jQuery.ajaxSetup({ async: true });
  resetForm();
}

//-----------------------------------------------
//-----------update form data into JPDB ------------
function validateUpdateFormData() {
  let recordNoVar = $("#recordNo").val();
  let updateStudentIdVar = $("#updateStudentId").val();
  let updateStudentNameVar = $("#updateStudentName").val();
  let updateStudentEmailVar = $("#updateStudentEmail").val();
  let updateStudentMobileNoVar = $("#updateStudentMobileNo").val();

  let obj = {};
  if (recordNoVar === "") {
    alert("Record No Required Value");
    $("#recordNo").focus();
    return "";
  }

  if (
    updateStudentIdVar === "" &&
    updateStudentNameVar === "" &&
    updateStudentEmailVar === "" &&
    updateStudentMobileNoVar === ""
  ) {
    alert("No update");
    $("#recordNo").focus();
    return "";
  }
  if (updateStudentIdVar !== "") {
    obj.id = updateStudentIdVar;
  }
  if (updateStudentNameVar !== "") {
    obj.name = updateStudentNameVar;
  }
  if (updateStudentEmailVar !== "") {
    obj.email = updateStudentEmailVar;
  }
  if (updateStudentMobileNoVar !== "") {
    obj.mobileno = updateStudentMobileNoVar;
  }
  let jsonStrObj = {};
  jsonStrObj[recordNoVar] = obj;
  return jsonStrObj;
}

function resetUpdateForm() {
  $("#recordNo").val("");
  $("#updateStudentId").val("");
  $("#updateStudentName").val("");
  $("#updateStudentEmail").val("");
  $("#updateStudentMobileNo").val("");
}

function updateStudentRecord() {
  //validation
  console.log("hello");
  let jsonStr = validateUpdateFormData();
  if (jsonStr === "") {
    return;
  }

  //updating the record

  console.log(Object.values(jsonStr)[0]);

  let reqStr = createUPDATERecordRequest(
    "90937372|-31949298369836093|90943278",
    JSON.stringify(Object.values(jsonStr)[0]),
    "Student",
    "Student-Rel",
    Object.keys(jsonStr)[0]
  );

  alert(reqStr);
  jQuery.ajaxSetup({ async: false });
  var resultObj = executeCommandAtGivenBaseUrl(
    reqStr,
    "http://api.login2explore.com:5577",
    "/api/iml"
  );
  alert(JSON.stringify(resultObj));
  jQuery.ajaxSetup({ async: true });

  resetUpdateForm();
}

///////////////////////////////////////////////////////
//----------------- delete form data into JPDB --------------------
function validateDeleteFormData() {
  let deleteRecordNoVar = $("#deleteRecordNo").val();

  if (deleteRecordNoVar === "") {
    alert("Record No Required Value");
    $("#deleteRecordNo").focus();
    return "";
  }

  return Number(deleteRecordNoVar);
}

function resetDeleteForm() {
  $("#deleteRecordNo").val("");
}

function deleteStudentRecord() {
  let recordNo = validateDeleteFormData();

  if (recordNo === "") return;

  let reqStr = createREMOVERecordRequest(
    "90937372|-31949298369836093|90943278",
    "Student",
    "Student-Rel",
    recordNo
  );

  alert(reqStr);
  jQuery.ajaxSetup({ async: false });
  var resultObj = executeCommandAtGivenBaseUrl(
    reqStr,
    "http://api.login2explore.com:5577",
    "/api/iml"
  );
  alert(JSON.stringify(resultObj));
  jQuery.ajaxSetup({ async: true });

  resetDeleteForm();
}
