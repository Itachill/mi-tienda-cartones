import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Texto sobre el carrusel */}
      <div className="home-hero-text">
        <h1>Bienvenido a TrasherBox</h1>
        <p>Cajas de cartón de calidad, listas para entregar</p>
      </div>

      {/* Carrusel */}
      <div className="home-hero">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          interval={3000}
          transitionTime={800}
          showArrows
          showIndicators
          showStatus={false}
        >
          <div>
            <img src="/banners/image.1.jpg" alt="Imagen 1" />
          </div>
          <div>
            <img src="/banners/image.2.jpg" alt="Imagen 2" />
          </div>
          <div>
            <img src="/banners/image.3.jpg" alt="Imagen 3" />
          </div>
        </Carousel>
      </div>

      {/* Sección informativa con estructura tipo Shopify */}
      <section className="home-info-grid">
        <div className="info-item">
          <img src="/banners/image.3.jpg" alt="Visión" />
          <div>
            <h2>Nuestra Visión</h2>
            <p>Ser líderes en la industria de embalajes sustentables, destacando por la calidad, eficiencia e innovación en nuestras soluciones de cartón.</p>
          </div>
        </div>

        <div className="info-item">
          <img src="/banners/image.2.jpg" alt="Misión" />
          <div>
            <h2>Nuestra Misión</h2>
            <p>Entregar productos de embalaje confiables que aporten valor a nuestros clientes, protejan sus productos y respeten el medio ambiente.</p>
          </div>
        </div>

        <div className="info-item">
          <img src="/banners/image.1.jpg" alt="Beneficios" />
          <div>
            <h2>¿Por qué elegirnos?</h2>
            <ul>
              <li>✔ Entregas rápidas y seguras.</li>
              <li>✔ Cajas reciclables y resistentes.</li>
              <li>✔ Precios competitivos para todos los tamaños de negocio.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
