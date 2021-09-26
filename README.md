# aromawheel
위스키 아로마휠 구성하기

기존 출처:
https://observablehq.com/@d3/sunburst@242

이 폴더에서 웹 서버를 실행하여 브라우저에서 노트북 실행하기 (맥/Linux 권장사항) -- 윈도우 사용자는 브라우저에서 바로 수정하는 것을 권장합니다. 

~~~sh
npx http-server
~~~

아니면 [Observable Runtime](https://github.com/observablehq/runtime)
이 모듈을 어플리케이션으로 직접 가져오는 법.  npm 설치: 

~~~sh
npm install @observablehq/runtime@4
npm install https://api.observablehq.com/@d3/sunburst@242.tgz?v=3
~~~

그런 다음 노트북을 다음과 같이 가져오는 법:

~~~js
import {Runtime, Inspector} from "@observablehq/runtime";
import define from "@d3/sunburst";
~~~
