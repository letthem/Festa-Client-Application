import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';

export default function Layout() {
  return (
    <Continer>
      <Header />
      <Outlet />
    </Continer>
  );
}

const Continer = styled.div`
  min-width: 375px;
  max-width: 768px;
  min-height: calc(var(--vh, 1vh) * 100);
  margin: 0 auto;
`;
