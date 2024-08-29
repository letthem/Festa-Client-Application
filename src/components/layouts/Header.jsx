import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import hiuLogo from '@/assets/webps/layouts/hiuLogo.webp';
import hiuLogoBlack from '@/assets/webps/layouts/hiuLogoBlack.webp';
import backBtn from '@/assets/webps/layouts/backBtn.webp';
import hambergerMenu from '@/assets/webps/layouts/hambergerMenu.webp';
import hambergerMenuBlack from '@/assets/webps/layouts/hambergerMenuBlack.webp';
import { useNavigate, useLocation } from 'react-router-dom';
import Popup from '@/components/admin/Popup';
import PropTypes from 'prop-types';

export default function Header() {
  const nav = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isAdminPath = location.pathname === '/admin' || location.pathname === '/admin/event';

  const adminMenuRef = useRef(null);

  const useBlackImages = (path) => {
    // 검정색 홍익로고, 검정 메뉴바 로고 들어가는 path
    const blackImagePaths = ['/admin', '/admin/event'];
    return blackImagePaths.includes(path);
  };
  const blackImages = useBlackImages(location.pathname);

  const toggleMenu = (event) => {
    event.stopPropagation(); // 이벤트 전파를 막아 외부 클릭과의 충돌 방지
    setIsMenuOpen((prev) => !prev);
  };

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    nav(0);
  };

  const handleConfirmLogout = () => {
    handleLogout();
    setIsMenuOpen(false);
    setShowLogoutPopup(false);
  };

  const handleCancelLogout = () => {
    setIsMenuOpen(false);
    setShowLogoutPopup(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (adminMenuRef.current && !adminMenuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setShowLogoutPopup(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleGoBack = () => {
    nav(-1);
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 100);
  };

  const makers = location.pathname === '/likelion' || location.pathname === '/gaehwa';

  return (
    <>
      <HeaderLayout $path={location.pathname}>
        <HeaderBg $path={location.pathname}>
          {makers && (
            <HambergerMenu onClick={handleGoBack}>
              <img src={backBtn} alt="backBtb" />
            </HambergerMenu>
          )}
          {!makers && (
            <HambergerMenu onClick={toggleMenu}>
              <img src={blackImages ? hambergerMenuBlack : hambergerMenu} alt="hambergerMenu" />
            </HambergerMenu>
          )}
          <HiuLogo onClick={() => nav('/')}>
            <img src={blackImages ? hiuLogoBlack : hiuLogo} alt="hiuLogo" />
          </HiuLogo>

          <Right></Right>
        </HeaderBg>
        {isMenuOpen &&
          (isAdminPath ? (
            <AdminMenuBar
              adminMenuRef={adminMenuRef}
              handleCancelLogout={handleCancelLogout}
              handleConfirmLogout={handleConfirmLogout}
              showLogoutPopup={showLogoutPopup}
              setShowLogoutPopup={setShowLogoutPopup}
              nav={nav}
              closeMenu={() => setIsMenuOpen(false)}
            />
          ) : (
            <CommonMenuBar closeMenu={toggleMenu} />
          ))}
      </HeaderLayout>
    </>
  );
}

const AdminMenuBar = ({
  nav,
  handleCancelLogout,
  handleConfirmLogout,
  showLogoutPopup,
  setShowLogoutPopup,
  closeMenu,
  adminMenuRef,
}) => {
  return (
    <>
      <AdminBar ref={adminMenuRef}>
        <PageMenu>
          <Menu
            onClick={() => {
              nav('/admin');
              nav(0);
              closeMenu();
            }}
          >
            분실물 게시판 관리
          </Menu>
          <Menu
            onClick={() => {
              nav('/admin/event');
              closeMenu();
            }}
          >
            이벤트 관리
          </Menu>
        </PageMenu>
        <Logout onClick={() => setShowLogoutPopup(true)}>로그아웃</Logout>
      </AdminBar>
      {showLogoutPopup && (
        <Popup
          message="로그아웃 할까요?"
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
          confirmText="로그아웃"
          cancelText="취소"
        />
      )}
    </>
  );
};

const CommonMenuBar = ({ closeMenu }) => (
  <MenuBar>
    <ul>
      <li>Common Menu 1</li>
      <li>Common Menu 2</li>
      <li>Common Menu 3</li>
    </ul>
  </MenuBar>
);

CommonMenuBar.propTypes = {
  closeMenu: PropTypes.func.isRequired,
};

AdminMenuBar.propTypes = {
  nav: PropTypes.func.isRequired,
  handleCancelLogout: PropTypes.func.isRequired,
  handleConfirmLogout: PropTypes.func.isRequired,
  showLogoutPopup: PropTypes.bool.isRequired,
  setShowLogoutPopup: PropTypes.func.isRequired,
  closeMenu: PropTypes.func.isRequired,
  adminMenuRef: PropTypes.oneOfType([
    PropTypes.func, // ref로서의 함수 타입
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }), // ref로서의 객체 타입
  ]).isRequired,
};

const HeaderLayout = styled.div`
  width: 100%;
  max-width: 768px;
  min-width: 375px;
  margin: 0 auto;
  height: 5.6rem;
  background-color: transparent;
  position: fixed;
  top: 0rem;
  z-index: 100;

  ${(props) =>
    (props.$path === '/likelion' || props.$path === '/gaehwa') &&
    css`
      background-color: ${(props) => props.theme.colors.black};
    `}

  ${(props) =>
    props.$path.startsWith('/flame') &&
    css`
      background-color: ${(props) => props.theme.colors.flameBackgroundColor};
    `}

    
  ${(props) =>
    props.$path === '/admin' &&
    css`
      background-color: ${(props) => props.theme.colors.white};
      background-size: cover;
      background-position: center;
    `}

  ${(props) =>
    props.$path === '/admin/event' &&
    css`
      background-color: ${(props) => props.theme.colors.white};
      background-size: cover;
      background-position: center;
    `}
`;

const HeaderBg = styled.div`
  width: 100%;
  max-width: 768px;
  min-width: 375px;
  height: 5.6rem;
  position: fixed;
  top: 0rem;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${(props) =>
    (props.$path === '/likelion' || props.$path === '/gaehwa') &&
    css`
      background: rgba(22, 22, 22, 0.1);
      box-shadow: 0rem 0rem 0.4rem 0rem rgba(255, 255, 255, 0.12) inset;
      backdrop-filter: blur(0.2rem);
    `}

  ${(props) =>
    props.$path.startsWith('flame/') &&
    css`
      box-shadow: 0 0 0.4rem 0 rgba(255, 255, 255, 0.12);
      backdrop-filter: blur(0.2rem);
    `}

  ${(props) =>
    props.$path === '/admin' &&
    css`
      background-color: ${(props) => props.theme.colors.white};
      background-size: cover;
      background-position: center;
    `}

  ${(props) =>
    props.$path === '/admin/event' &&
    css`
      background-color: ${(props) => props.theme.colors.white};
      background-size: cover;
      background-position: center;
    `}
`;

const HambergerMenu = styled.div`
  cursor: pointer;
  margin-left: 2rem;
  width: 2.4rem;
  height: 2.4rem;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`;

const HiuLogo = styled.div`
  cursor: pointer;
  width: 14.7rem;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`;

const Right = styled.div`
  margin-right: 2rem;
  width: 2.4rem;
  height: 2.4rem;
`;

const MenuBar = styled.div`
  position: absolute;
  top: 5.6rem;
  left: 0;
  width: 100%;
  height: 100vh;
  max-width: 19.2rem;
  background-color: white;
  z-index: 99;
`;

const AdminBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  top: 5.6rem;
  left: 0;
  width: 100%;
  height: calc(100vh - 5.6rem);
  max-width: 19.2rem;
  background-color: white;
  z-index: 99;
`;

const PageMenu = styled.div`
  display: flex;
  flex-direction: column;
`;

const Menu = styled.span`
  padding: 1.6rem;
  text-align: left;
  ${(props) => props.theme.fontStyles.basic.body1Med};
  font-size: 1.6rem;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.gray20};
  }
`;

const Logout = styled.span`
  ${(props) => props.theme.fontStyles.basic.body1Bold};
  padding: 1.6rem;
  font-size: 1.6rem;
  text-align: center;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.gray70};
  cursor: pointer;
`;
