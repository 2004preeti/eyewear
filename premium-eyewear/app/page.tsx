import Navbar from '../components/Navbar';
import Home from '../components/Home';
import Footer from '../components/Footer';
import ProductPage from './product/[slug]/page';


export default function App() {
  return (
    // Yeh khali tag (<></>) Fragment kehlata hai,
    // iske andar aap multiple components rakh sakte ho.
    <>
      <Navbar />

      {/* Main page ka content yahan aayega */}
      <main className="min-h-screen">
        <Home />
      </main>

      <Footer />
    </>
  );
}
