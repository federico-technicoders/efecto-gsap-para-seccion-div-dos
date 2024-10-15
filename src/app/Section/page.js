'use client'

import { useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger);

export const Section = () => {
    const sectionRef = useRef(null)
    const leftSectionRef = useRef(null)
    const rightSectionsRef = useRef(null)

    useGSAP(() => {
        const section = sectionRef.current
        const leftSection = leftSectionRef.current
        const rightSections = rightSectionsRef.current.querySelectorAll('.right-section')

        gsap.set(section, { height: (rightSections.length * 100) + "vh" })
        
        ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            pin: leftSection,
            pinSpacing: false
        })

        rightSections.forEach((sectionElement, index) => {
            ScrollTrigger.create({
                trigger: sectionElement,
                start: () => "top top",
                // end: () => "+=" + sectionElement.offsetHeight,
                pin: true, // Fija la sección en su lugar
                pinSpacing: false, // No agregar espacio extra
                scrub: 6,
                // snap: 1 / (rightSections.length - 1),
                // invalidateOnRefresh: false
                // markers: true // Solo para depuración, puedes quitarlo en producción
            })
        })      
    })

  return (
        <section 
            ref={sectionRef}
            className="relative flex w-full h-screen"
        >
            {/* Mitad izquierda fija */}
            <div className="w-1/2 bg-blue-500 sticky top-0 h-screen flex justify-center items-center">
                <h2 className="text-white text-4xl font-bold">Contenido Fijo</h2>
            </div>

            {/* Mitad derecha con múltiples secciones */}
            <div 
                ref={rightSectionsRef} 
                className="w-1/2"
            >
                <div className="right-section bg-green-500 h-screen flex justify-center items-center">
                    <h3 className="text-white text-2xl">Sección 1</h3>
                </div>
                <div className="right-section bg-red-500 h-screen flex justify-center items-center">
                    <h3 className="text-white text-2xl">Sección 2</h3>
                </div>
                <div className="right-section bg-yellow-500 h-screen flex justify-center items-center">
                    <h3 className="text-white text-2xl">Sección 3</h3>
                </div>
                <div className="right-section bg-purple-500 h-screen flex justify-center items-center">
                    <h3 className="text-white text-2xl">Sección 4</h3>
                </div>
            </div>
        </section>
    )
}