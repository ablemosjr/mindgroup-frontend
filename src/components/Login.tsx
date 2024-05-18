import React, { useState } from "react";

const Login: React.FC = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();

    try {
      if (isRegister) {
        // Registrar usuário
        console.log(name, email, password);
      } else {
        // Login de usuário
        console.log(email, password);
      }
    } catch (error) {
      setError('Erro ao enviar formulário.');
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
            />
          </div>
          {error && <span className="text-[#BF3F46] text-sm font-medium h-3.5">{error}</span>}
        </div>
        
        <button type="submit"
          className="uppercase py-3 w-[60%] rounded-sm shadow-lg font-bold text-white tracking-widest gradient-color hover:brightness-110 active:scale-105"
        >{isRegister ? 'Registrar' : 'Login'}
        </button>

        <span className="cursor-pointer text-sm font-light hover:font-semibold" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 
            'Já possui uma conta? Faça login!' 
            : 
            'Não está cadastrado? Registre-se aqui.'
          }
        </span>
      </form>
    </section>
  )
}

export default Login;