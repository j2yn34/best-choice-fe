# Best Choice FE ReadMe

# 프로젝트 소개
💭 인생은 B(Birth)와 D(Death)사이의 C(Choice). <br />
고민되는 선택의 순간들과 세간의 핫한 이슈들에 대해 함께 의견을 나눌 수 있다면 어떨까?

💡Best Choice는 사용자가 <b>투표</b> 게시글을 업로드할 수 있고, <b>실시간 다인원 채팅</b>과 <b>실시간 알림 서비스</b>를 제공하는 웹 서비스입니다. 

**프로젝트 기간**: 2023.08 ~ 2023. 09

**배포 주소**: 👉 <a href=https://best-choice-steel.vercel.app/> Best Choice 바로가기 </a>

<br />

# FE 기술 스택
<div>
  <img src="https://img.shields.io/badge/react-black?style=for-the-badge&logo=react&logoColor=61DAFB"></a>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/></a>
  <img src="https://img.shields.io/badge/StyledComponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"></a>
  <img src="https://img.shields.io/badge/Tailwind.css-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/></a>
</div>
<div>
  <img src="https://img.shields.io/badge/recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=black"></a>
  <img src="https://img.shields.io/badge/reactquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"></a>
</div>
<div>
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white"/></a>
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/></a>
  <img src="https://img.shields.io/badge/Figma-7E4DD2?style=for-the-badge&logo=figma&logoColor=white"/></a>
</div>

<br />

# FE 핵심 기능

## 0. msw API Mocking 라이브러리를 사용하여 mock data를 생성해 프론트엔드 기능 개발
   * 백엔드 API가 구현되기 전까지 mock data를 사용해 백엔드 개발 진행 사항에 구애받지 않고 독립적으로 프론트엔드 개발을 진행하여 프로젝트 일정에 맞춰 필요한 기능을 모두 구현할 수 있었습니다.
   * 추가적으로, 백엔드 API와 연동할 때 mock data로 개발한 코드의 일부분만 수정함으로써 효율적인 코드 작성이 가능했습니다.
<br />

## 1. 컴포넌트 단위로 에러 및 로딩 화면 처리
  * ErrorBoundary와 Suspense를 사용하여 에러 발생 시 에러메시지 및 데이터 로딩 시 로딩 UI를 렌더링하도록 구현했습니다.
  * 에러 및 로딩 처리를 전체적으로 적용하지 않고 <b>컴포넌트 단위별로</b> 적용함으로써 사용자 경험을 향상시켰습니다.
  * React.lazy를 사용하여 초기 로딩 속도 개선을 통한 성능 향상 효과를 기대하였습니다.
<br />

## 2. Skeleton UI 적용
  * 로딩 화면에 Skeleton UI를 적용함으로써 사용자가 로딩 후에 표시될 화면을 미리 예상할 수 있도록 하였습니다.
  * 이를 통해 Spinner UI 등 다른 로딩 UI와 비교하여 사용자 경험 향상 및 로딩 중 사용자 이탈 감소 효과를 기대하였습니다.
<br />

## 3. 게시글 상세페이지 투표/그래프, 추천 기능
  * dompurify, html-react-parser를 이용하여 글쓰기 에디터로 작성한 데이터 렌더링 시 XSS 공격에 대한 보안을 강화했습니다.
  * chart.js 라이브러리를 사용하여 투표 결과가 그래프로 바로 반영될 수 있도록 구현했습니다. 
  * 게시글 추천 또는 추천 취소 시 아이콘 색상 변화가 바로 반영되도록 낙관적 업데이트(Optimistic UI)를 구현함으로써 사용자 경험을 향상시켰습니다.
<br />

## 4. 텍스트와 이미지/동영상을 동시에 전송할 수 있는 다중 파일 첨부 기능
  * file-input의 multipart 속성을 활용하여, 사용자가 여러 파일을 동시에 첨부할 수 있도록 구현했습니다.
  * multipart/form-data 형식을 이용하여 텍스트와 이미지 또는 동영상을 동시에 서버에 전송할 수 있도록 했습니다.
  * 더불어, 파일 첨부 과정에서 발생할 수 있는 예기치 않은 오류를 방지하기 위해서 파일 용량에 제한을 두었습니다.
<br />

## 5. 실시간 알림 기능 (사용자가 투표/추천/댓글 반응을 한 게시글의 채팅방이 열린 경우)
  * EventSource API를 사용하여 서버로부터 sse 실시간 알림 데이터를 수신했습니다.
  * 수신한 알림 상태를 recoil을 이용하여 전역 상태로 관리하였습니다. <br />
        새로운 알림을 받은 경우 헤더의 알림 아이콘에 표시되도록 하였고, 알림 아이콘을 클릭하여 알림페이지가 마운트 되는 경우에 알림 표시가 제거되도록 구현했습니다.
<br />

## 6. Stomp.js를 활용한 실시간 다인원 채팅 기능
  * stomp 프로토콜과의 연결, 메시지 전송, 구독 등의 기능을 사용하기 위해 stomp.js 라이브러리를 활용했습니다.
  * 채팅이 진행 중인 게시글의 제목과 투표 항목을 채팅방 내에서 확인할 수 있도록 함으로써 사용자 경험을 향상시켰습니다.
<br />

## 7. 로그인/비로그인 사용자 권한 관리
  * 게시글/댓글 작성, 투표, 추천 등 일부 기능은 로그인 한 사용자만 사용할 수 있도록 제한했습니다.
  * 비로그인 사용자가 제한된 기능 클릭 시 로그인 유도 모달 오픈 또는 로그인 페이지로 이동하도록 구현했습니다.
