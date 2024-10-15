'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Section } from "./Section/page"

gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  useEffect(() => {
      const smoothScroll = () => {
        let scrollSpeed = 0;
        let lastScrollTop = 0;
        let delta = 0;
  
        // Detectar el scroll
        window.addEventListener('scroll', () => {
          let st = window.pageYOffset || document.documentElement.scrollTop;
          delta = st - lastScrollTop;
          lastScrollTop = st;
        });
  
        // Actualizar el scroll con inercia controlada
        const updateScroll = () => {
          scrollSpeed += (delta - scrollSpeed) * 0.05; // Ajusta este valor para suavidad (0.05 = inercia leve)
          
          // Añadimos una fricción para reducir la velocidad poco a poco
          scrollSpeed *= 0.92; // Fricción, entre más bajo el valor, más rápido se disipa la inercia
          
          if (Math.abs(scrollSpeed) > 0.1) { // Solo sigue si la velocidad es lo suficientemente alta
            window.scrollBy(0, scrollSpeed);
          }
  
          requestAnimationFrame(updateScroll);
        };
  
        updateScroll();
      }
  
      smoothScroll()
  }, [])

  return (
    <>
      <Section />
      {/* <Section />
      <Section /> */}
      {/* <Section />
      <Section />
      <Section />
      <Section />
      <Section />
      <Section /> */}
      {/* <Section /> */}
    </>
  )
}
