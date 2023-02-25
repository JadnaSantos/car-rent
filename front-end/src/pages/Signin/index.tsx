import { useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as S from './styles';
import logo from '../../assets/car.svg';

import { useForm } from 'react-hook-form';
import { useAuth } from '../../hook/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { Envelope, Lock, SignIn as Login } from 'phosphor-react';
import { toast } from 'react-toastify';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { FormValidationSchema, SchemaFieldSignin } from '../../infra/http/zod/validations/schemas';


function Signin() {
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const FormValidation = useForm<SchemaFieldSignin>({
    resolver: zodResolver(FormValidationSchema)
  });

  const { handleSubmit, register, reset } = FormValidation;

  async function handleLogin(data: SchemaFieldSignin) {
    try {
      const { username, password } = data;

      setLoading(true);

      await signIn({
        username, password
      });

      console.log(username, password);

      reset();

      navigate('/home');
    } catch (err) {
      toast.error('Ocorreu um erro insperado, por favor, tente mais tarde');
    } finally {
      setLoading(false);
    }
  }

  return (
    <S.Container>
      <S.Content>
        <S.AnimationContainer>
          <form onSubmit={handleSubmit(handleLogin)}>
            <h4>Faça seu login</h4>

            <Input
              icon={Envelope}
              placeholder='E-mail'
              type='username'
              required
              {...register('username')}
              {...inputRef}
            />

            <Input
              icon={Lock}
              type='password'
              autocomplete="on"
              placeholder='Senha'
              {...register('password')}
              {...inputRef}
            />

            <Button
              type='submit'
              loading={loading}
            >
              Entrar
            </Button>


            <a href='forgot'>Esqueci minha senha</a>

          </form>

          <Link to='/sing-up'>
            <Login size={12} />
            Criar Conta
          </Link>
        </S.AnimationContainer>

      </S.Content>

      <S.Background />
    </S.Container>
  );
}

export { Signin };

