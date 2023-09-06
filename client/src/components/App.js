// import React, { Suspense } from 'react';
// import { Route, Switch } from "react-router-dom";
// import Auth from "../hoc/auth";
// // pages for this product
// import LandingPage from "./views/LandingPage/LandingPage.js";
// import LoginPage from "./views/LoginPage/LoginPage.js";
// import RegisterPage from "./views/RegisterPage/RegisterPage.js";
// import NavBar from "./views/NavBar/NavBar";
// import Footer from "./views/Footer/Footer"
// import VideoUploadPage from './views/VideoUploadPage/VideoUploadPage';
// import CrawlingPage from './views/CrawlingPage/CrawlingPage';
// //null   Anyone Can go inside
// //true   only logged in user can go inside
// //false  logged in user can't go inside

// function App() {
//   return (
//     <Suspense fallback={(<div>Loading...</div>)}>
//       <NavBar />
//       <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
//         <Switch>
//           <Route exact path="/" component={Auth(LandingPage, null)} />
//           <Route exact path="/login" component={Auth(LoginPage, false)} />
//           <Route exact path="/register" component={Auth(RegisterPage, false)} />

//           {/* 나중에 true로 바꿔서 로그인 했을 때만 보이게 해주기 */}
//           <Route exact path="/video/upload" component={Auth(VideoUploadPage, false)}/>
//           <Route exact path="/crawling" component={Auth(CrawlingPage, false)} />

//         </Switch>
//       </div>
//       <Footer />
//     </Suspense>
//   );
// }

// export default App;
// //Auth부분이 null이면 아무나 들어갈 수 있고, false면 로그인 안했을 때만, true면 로그인했을 때만

import React, { Suspense } from 'react';
// import { BrowserRouter as Router, Route, Routes, Link, Outlet, Navigate } from 'react-router-dom';

import { BrowserRouter, Routes, Route, useNavigate  } from 'react-router-dom';

import Auth from "../hoc/auth";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import VideoUploadPage from './views/VideoUploadPage/VideoUploadPage';
import CrawlingPage from './views/CrawlingPage/CrawlingPage';

function App() {
  const navigate = useNavigate();

  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Routes>
          <Route path="/" element={Auth(LandingPage, null)} />
          <Route path="/login" element={Auth(LoginPage, false)} />
          <Route path="/register" element={Auth(RegisterPage, false)} />

          {/* 나중에 true로 바꿔서 로그인 했을 때만 보이게 해주기 */}
          <Route path="/video/upload" element={Auth(VideoUploadPage, false)} />
          <Route path="/crawling" element={Auth(CrawlingPage, false)} />

          {/* 여기에 더 많은 라우트를 추가할 수 있습니다 */}
        </Routes>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
