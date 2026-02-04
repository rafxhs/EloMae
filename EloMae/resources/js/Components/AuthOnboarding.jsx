import { useEffect, useState } from "react";
import { Link } from "@inertiajs/react";
import ApplicationLogo from '@/Components/ApplicationLogo';

const slides = [
    {
        title: "Conheça seus direitos",
        description: "Tenha acesso rápido a direitos garantidos por lei, benefícios sociais e orientações essenciais para mães.",
        image: "/images/onboarding/image1.svg",
    },
    {
        title: "Rede de apoio real",
        description: "Conecte-se com outras mães, compartilhe vivências, tire dúvidas e encontre apoio em grupos temáticos e espaços seguros.",
        image: "/images/onboarding/image2.svg",
    },
    {
        title: "Encontre apoio onde estiver",
        description: "Visualize no mapa instituições como CRAS, ONGs, Delegacias da Mulher e creches públicas próximas à sua localização.",
        image: "/images/onboarding/image3.svg",
    },
    {
        title: "Sua rotina, com mais cuidado",
        description: "Agende compromissos importantes e receba lembretes sobre consultas, audiências, pagamentos e muito mais.",
        image: "/images/onboarding/image4.svg",
    },
    {
        title: "Acolhimento, apoio e informação",
        description: "Com o EloMãe, você tem uma plataforma feita para entender, ouvir e ajudar. Seu caminho começa aqui.",
        image: "/images/onboarding/image5.svg",
    },
];

export default function AuthOnboarding({ children }) {
    const [current, setCurrent] = useState(0);

    const slide = slides[current];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="hidden md:flex min-h-[500px] flex-col justify-between rounded-2xl p-8 bg-gradient-to-b from-primary-900 to-primary-800 text-white">
            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                </Link>
            </div>

            <img
                src={slide.image}
                alt={slide.title}
                className="w-[320px] h-[260px] object-contain"
            />

            <div className="space-y-4">
                <h1 className="text-xl font-semibold">
                    {slide.title}
                </h1>

                <p className="text-sm text-justify leading-relaxed">
                    {slide.description}
                </p>
            </div>

            <div className="flex justify-center gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-2.5 h-2.5 rounded-full transition
                                ${current === index
                                ? 'bg-white'
                                : "bg-white/40"
                            }`}
                    />
                ))}
            </div>

        </section>
    );
}