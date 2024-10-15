'use client'
import { useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger);

export const Section = () => {
    const [currentSection, setCurrentSection] = useState(1) 
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
            // start: "top top",
            start: "bottom bottom",
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
                pinSpacing: false, 
                scrub: 6,
                // snap: 1 / (rightSections.length - 1),
                // invalidateOnRefresh: false
                // markers: true,
                onEnter: () => handleSectionChange(index + 1), 
                onEnterBack: () => handleSectionChange(index + 1)
            })
        })      
    })

    const handleSectionChange = (sectionNumber) => {
        gsap.to({}, { 
            duration: 1, 
            onUpdate: () => {
                setCurrentSection(sectionNumber) 
            }
        });
    }

  return (
        <section 
            ref={sectionRef}
            className="relative flex w-full h-screen"
        >
            {/* Mitad izquierda fija */}
            <article className="w-1/2 bg-white sticky top-0 h-screen flex justify-center items-center">
                <h2 className="text-black text-4xl font-bold">Contenido Fijo</h2>
                <div 
                    className="absolute flex justify-center items-center -right-[150px] w-[300px] h-[300px] bg-black rounded-2xl z-10"
                >
                    <span className="text-9xl font-bold">0{currentSection}</span>
                </div>
            </article>

            {/* Mitad derecha con múltiples secciones */}
            <aside 
                ref={rightSectionsRef} 
                className="w-1/2 -z-10"
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
            </aside>
        </section>
    )
}