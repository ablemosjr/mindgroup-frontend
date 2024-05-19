import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Button from "./LinkButton";

const Login: React.FC = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const { login, register, error } = useAuth();

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    try {
      if (isRegister) {
        await register(name, email, password);
        setIsRegister(false);
      } else {
        await login(email, password);
      }
    } catch (error) {
      console.error('Erro ao enviar formulário.', error);
    }
  }

  return (
    <section className="flex flex-col items-center justify-center w-full h-dvh lg:w-[35%] p-5">
      <h1 className="font-outfit font-medium text-2xl mb-8">Sistema de Estoque</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8 p-4 w-full sm:w-[350px] h-[50%] items-center">
        <div className="flex flex-col gap-2 w-full">
          {isRegister && (
            <div className="flex flex-col">
              <label htmlFor="formName" 
                className="font-outfit text-neutral-600 mb-2"
              >Nome:
              </label>
              <input id="formName"
                type="text"
                name="formName"
                className="p-3 border rounded-md outline-neutral-600 bg-neutral-50"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
            </div>            
          )}
          <div className="flex flex-col">
            <label htmlFor="formEmail" 
              className="font-outfit text-neutral-600 mb-2"
            >E-mail:
            </label>
            <input id="formEmail"
              type="email"
              name="formEmail"
              className="p-3 border rounded-md outline-neutral-600 bg-neutral-50"
              value={email}
              onChange={(ev) => setEmail(ev.target.value)}
              minLength={3}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="formPassword"
              className="font-outfit text-neutral-600 mb-2"
            >Senha:
            </label>
            <input id="formPassword"
              type="password"
              name="formPassword"
              className="p-3 border rounded-md outline-neutral-600 bg-neutral-50"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
              minLength={6}
            />
          </div>
          {error && <span className="text-[#BF3F46] text-sm font-medium h-3.5">{error}</span>}
        </div>
        
        <button type="submit"
          className="uppercase py-3 w-[60%] font-bold button gradient-color"
        >{isRegister ? 'Registrar' : 'Login'}
        </button>

        <Button onClick={() => setIsRegister(!isRegister)}
        title={isRegister ? 
          'Já possui uma conta? Faça login!' 
          : 
          'Não está cadastrado? Registre-se aqui.'
        }
        />
      </form>
    </section>
  )
}

export default Login;