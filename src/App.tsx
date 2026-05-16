import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import HomePage from '@/src/pages/HomePage';
import ProductDetailPage from '@/src/pages/ProductDetailPage';
import CartPage from '@/src/pages/CartPage';
import Navbar from '@/src/components/Navbar';


function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-full flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products/:slug" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </main>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
