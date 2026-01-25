<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\DevelopmentPhase;

class DevelopmentPhaseSeeder extends Seeder
{
    public function run(): void
    {
        $phases = [
            [
                'title' => 'Recém-nascido (0–1 mês)',
                'start_month' => 0,
                'end_month' => 1,
                'description' => 'Adaptação ao mundo fora do útero, reflexos primitivos e necessidade constante de contato.'
            ],
            [
                'title' => 'Primeiros Sorrisos (2–3 meses)',
                'start_month' => 2,
                'end_month' => 3,
                'description' => 'Sorrisos sociais, maior atenção a sons e rostos familiares.'
            ],
            [
                'title' => 'Descoberta do Corpo (4–5 meses)',
                'start_month' => 4,
                'end_month' => 5,
                'description' => 'Exploração das mãos, pés e objetos, maior controle corporal.'
            ],
            [
                'title' => 'Interações e Balbucios (6–7 meses)',
                'start_month' => 6,
                'end_month' => 7,
                'description' => 'Balbucios mais complexos, reconhecimento de pessoas próximas.'
            ],
            [
                'title' => 'Ansiedade de Separação (8–9 meses)',
                'start_month' => 8,
                'end_month' => 9,
                'description' => 'Estranhamento, maior apego e reações à separação.'
            ],
            [
                'title' => 'Exploração Ativa (10–12 meses)',
                'start_month' => 10,
                'end_month' => 12,
                'description' => 'Engatinhar, tentativa de ficar em pé e exploração do ambiente.'
            ],
            [
                'title' => 'Primeiros Passos (13–15 meses)',
                'start_month' => 13,
                'end_month' => 15,
                'description' => 'Início da marcha e maior independência motora.'
            ],
            [
                'title' => 'Comunicação Inicial (16–18 meses)',
                'start_month' => 16,
                'end_month' => 18,
                'description' => 'Primeiras palavras, gestos intencionais e compreensão simples.'
            ],
            [
                'title' => 'Autonomia e Limites (19–24 meses)',
                'start_month' => 19,
                'end_month' => 24,
                'description' => 'Desejo de independência, frustrações e testes de limites.'
            ],
            [
                'title' => 'Imaginação e Linguagem (25–36 meses)',
                'start_month' => 25,
                'end_month' => 36,
                'description' => 'Expansão da linguagem, imaginação e interação social.'
            ],
        ];

        foreach ($phases as $phase) {
            DevelopmentPhase::updateOrCreate(
                [
                    'start_month' => $phase['start_month'],
                    'end_month' => $phase['end_month'],
                ],
                $phase
            );
        }
    }
}
