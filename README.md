# docker-compose

브라우저를 새로고침할 때마나 화면에 표시된 숫자가 1씩 증가하는 간단한 앱

1) npm init    (for making package.json file)

2) package.json 파일에서
   - main을 index.js를 server.js로 변경 (entry point)
   - scripts에 "start" : "node server.js",  추가
   - 종속성 추가(express, redis) "scripts"와 "author" 사이에 입력 (종속 파일 다운로드용)
     "dependency" : {
         "express": "4.17.1",
         "redis": "3.0.2",
     },

3) entry point "server.js" 파일 만들기

4) redis 설명
   Remote Dictionay Server의 약어로 메모리 기반의 키-값 구조 데이터 관리
   시스템이며, 모든 데이터를 메모리에 저장하고 빠르게 조회 가능한 비관계형
   데이터베이스(NoSQL)이다 

   레디스의 장점
   메모리에 저장을 하기 때문에 mysql 같은 데이터베이스에 데이터를 저장하는 것과
   데이터를 불러올 때 훨씬 빠르게 처리할 수 있으며,
   비록 메모리에 저장하지만 영속적으로 보관이 가능하다.
   그래서 서버를 재부팅해도 데이터를 유지할 수 있는 장점이 있다.

   Node.js 환경에서 Redis 사용방법
    - 먼저 redis-server를 작동
    - 그리고 redis 모듈을 다운로드
    - redis 모듈을 받은 후 redis 클라이언트를 생성하기 위해서
      redis에서 제공하는 createClient() 함수를 이용해서 
      redis.createClient로 레디스 클레이언트를 생성해준다.
    - 하지만 여기서 redis server가 작동하는 곳과 node.js 앱이 작동하는 곳이
      다른 곳이라면 host 인자와 port 인자를 명시해주어야 한다.
    
      server.js 파일에서 코드 추가

도커 환경에서 레디스 클라이언트 생성시 주의사항
    보통 도커를 사용하지 않는 환경에서는 Redis 서버가 작동되고 있는 곳의
    host 옵션을 URL (예컨데 "https://redis-server.compose")처럼 주면 되지만, 도커 Compose를 사용할 때는 host 옵션을
    docker-compose.yml 파일에 명시한 컨테이너 이름(예컨데, "redis-server")을 주면 된다.


5) server.js에서 redis 클라이언트 생성 및 숫자 1씩 증가 부분 코딩

6) Dockerfile 작성 (node.js 부분을 위한 도커 파일)

-- 이제 실행해보기

7) redis server 기동하기   "docker run redis"  (별도의 컨테이너)

8) docker 이미지 생성 'docker build -t kstyle0710/docker-compose-app ./' (별도의 컨테이너)

   상기 두 컨테이너간 연결성이 없기 때문에 애러 발생 (컨테이너간 통신 X)
   ************************
   그래서 멀티 컨테이너 상황에서 서로 네트워크를 가능하게 해주는 것이
   Docker Compose 이다.
   **************************

9) docker compose 파일 작성하기 docker-compose.yml

10) docker compose 실행 명령어 "docker-compose up" (이미지가 없을 때 이미지 빌드후 컨테이너 시작)
    - 중간에 에러나서 재빌드시 "docker-compose up --build" (이미지가 있든 없던 이미지 빌드하고 컨테이너 시작)
    - detach 모드로 앱을 백그라운드에서 실행시 "docker-compose up -d --build"
       (단일 터미널 사용 조작 가능)

11) Docker compose 컨테이너를 멈추기 "docker-compose down"
