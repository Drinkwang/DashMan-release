self.addEventListener('message', function (e) {
    var xmlreq = new XMLHttpRequest();
    xmlreq.responseType = "text";
    xmlreq.onload = function (e) {
        var data = e.currentTarget.response;
    //   self.postMessage(data);
     //   console.log(data);
    }
   // console.log(data);
    xmlreq.open("get", "res/conf/level1.json");
    xmlreq.send()
}, false);