import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../hook/useAuth';
import * as S from './styles';
import logo from '../../assets/car.svg';
import { ArrowLeft, Envelope, Lock, Phone } from 'phosphor-react';


import { FormValidationSignupSchema, SchemaFieldSignup } from '../../infra/http/zod/validations/schemas';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();


  const FormValidation = useForm<SchemaFieldSignup>({
    resolver: zodResolver(FormValidationSignupSchema)
  });

  const { handleSubmit, register, reset } = FormValidation;

  async function handleSignup(data: SchemaFieldSignup) {
    try {
      const { username, password, phone } = data;

      await signup({
        username, password, phone
      });

      reset();

      toast.success('Cadastrado realizado com sucesso');

      navigate('/');

    } catch (error) {
      toast.error('E-mail já está cadastrado no sistema');
    }
  }


  return (
    <S.Container>
      <S.Content>
        <img src={logo} alt='logo' />


        <form onSubmit={handleSubmit(handleSignup)}>
          <h4>Faça seu login</h4>

          <Input
            icon={Envelope}
            placeholder='E-mail'
            type='username'
            required
            {...register('username')}
          />

          <Input
            icon={Lock}
            type='password'
            autocomplete="on"
            placeholder='Senha'
            {...register('password')}
          />


          <Input
            icon={Phone}
            type='number'
            placeholder='número de telefone'
            {...register('phone')}
          />

          <Button
            type='submit'
          >
            Cadastrar
          </Button>


          <a href='forgot'>Esqueci minha senha</a>

        </form>

        <Link to='/'>
          <ArrowLeft size={12} />
          Voltar para login
        </Link>
      </S.Content>
    </S.Container>
  );
}

export { Signup };
