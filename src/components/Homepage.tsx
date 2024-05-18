import Login from "./Login";

import homeImage from '../assets/home-unsplash.avif';

const Homepage: React.FC = () => {
  return (
    <main className="flex w-full">
      <img src={homeImage} alt="Imagem de Menu" className="hidden lg:block w-[65%] h-dvh object-cover" />
      <Login />
    </main>
  )
}

export default Homepage;