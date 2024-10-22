import Nav from '../components/nav/Nav';
import { ReactNode } from 'react';
import UserNav from '../components/userNav/UserNav';

type UserLayoutProps = {
  children: ReactNode;
};

const UserLayout = ({ children }: UserLayoutProps) => {
  return (
    <>
      <Nav />
      <UserNav />
      <div>{children}</div>
    </>
  );
};

export default UserLayout;
