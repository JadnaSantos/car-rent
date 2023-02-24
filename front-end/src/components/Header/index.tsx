import React, { useState } from 'react';
import logo from '../../assets/car.svg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';
import * as S from './styles';
import { List, X, SignOut } from 'phosphor-react';
import { Button } from '../Button';


function Header() {
  const { singOut } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClickLogo = () => {
    navigate('/');
  };

  const handleClickSkills = () => {
    navigate('/rent');
  };

  const handleClickProjects = () => {
    navigate('/service');
  };

  const handleClickContact = () => {
    navigate('/contact');
  };

  return (
    <S.Container>
      <S.Content onClick={handleClickLogo}>
        <img src={logo} alt='logo car' />
      </S.Content>


      <S.MobileIcon onClick={handleOpen}>
        {open ? (
          <X size={24} weight="bold" />
        ) : (
          <List size={24} weight="bold" />
        )}
      </S.MobileIcon>

      <S.HeaderItem onClick={handleOpen} click={open}>
        <S.HeaderItems onClick={handleClickProjects}>Rent</S.HeaderItems>
        <S.HeaderItems onClick={handleClickSkills}>Service</S.HeaderItems>
        <S.HeaderItems onClick={handleClickContact}>Contact</S.HeaderItems>

        <S.AcessHeader>
          <Button>Login</Button>
          <Button>Signup</Button>
        </S.AcessHeader>

      </S.HeaderItem>




    </S.Container>
  );
}


export { Header };
