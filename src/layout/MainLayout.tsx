import Nav from '../components/nav/Nav';
import { ReactNode } from 'react';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Nav />
      <div>{children}</div>
    </>
  );
};

export default MainLayout;
