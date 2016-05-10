# IBM Bluemix Rest Api test

 이 프로젝트는 2016년 부산대학교 모바일 LAB 졸업과제를 수행하기 위해 만든 프로젝트 입니다. IBM Bluemix와 연동되어 있으며 REST API를 test하기 위해 만들어졌습니다.
 

* 프로젝트주소 : [http://gomeanjsjs.mybluemix.net/](http://gomeanjsjs.mybluemix.net/)
* Languages : HTML, Nodejs, MongoDB
* OPEN API : Google map API
* 주로 봐야할 문서
 - [app.js](https://github.com/AndersonChoi/BluemixRestApi/blob/master/app.js) : nodejs가 구동되어지는 가장 최상단 파일
 - [package.json](https://github.com/AndersonChoi/BluemixRestApi/blob/master/package.json) : nodejs가 bluemix상에서 올라가서 실행될 때 참조하는 파일, 특히 npm(Node Packaged Module) 종류가 선언되어 있기 때문에 app.js 나 혹은 다른 nodejs 문서에서 package가 추가될 때 이 파일에서 package를 추가해야 한다.
 - [index.html](https://github.com/AndersonChoi/BluemixRestApi/blob/master/public/index.html) : 가장 처음에 보이는 html파일(첫화면)
