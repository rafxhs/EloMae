<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Community;

class CommunitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $communities = [
            [
                'name' => 'Mães Solo',
                'description' => 'Espaço de acolhimento e troca entre mães que criam seus filhos sozinhas. Aqui, compartilhamos experiências, desafios e vitórias da maternidade solo.',
                'tags' => 'maternidade, apoio, mães solo, empoderamento',
            ],
            [
                'name' => 'Introdução Alimentar',
                'description' => 'Comunidade para trocar dicas, receitas e experiências sobre o início da alimentação dos bebês, com foco em alimentação saudável e respeitosa.',
                'tags' => 'alimentação, bebê, papinhas, BLW, nutrição infantil',
            ],
            [
                'name' => 'Aleitamento Materno',
                'description' => 'Espaço dedicado a mães que estão amamentando ou pretendem amamentar. Compartilhamos informações sobre pega correta, produção de leite e apoio emocional.',
                'tags' => 'amamentação, leite materno, cuidados, bebê, saúde',
            ],
            [
                'name' => 'Sono',
                'description' => 'Discussões sobre o sono do bebê e da mãe — rotinas, regressões, e estratégias para noites mais tranquilas.',
                'tags' => 'sono, bebê, rotina, descanso, maternidade',
            ],
            [
                'name' => 'Saúde Mental Materna',
                'description' => 'Um espaço seguro para falar sobre o emocional da mãe: ansiedade, sobrecarga e autocuidado durante a maternidade.',
                'tags' => 'saúde mental, autocuidado, ansiedade, maternidade real',
            ],
            [
                'name' => 'Educação Infantil',
                'description' => 'Troca de ideias sobre o desenvolvimento cognitivo, emocional e social das crianças nos primeiros anos.',
                'tags' => 'educação, desenvolvimento, aprendizado, filhos',
            ],
            [
                'name' => 'Direitos das Mães',
                'description' => 'Comunidade voltada para informações sobre direitos trabalhistas, benefícios e políticas públicas para mães.',
                'tags' => 'direitos, benefícios, licença maternidade, políticas públicas',
            ],
            [
                'name' => 'Vida Profissional e Maternidade',
                'description' => 'Discussão sobre carreira, trabalho remoto, empreendedorismo e equilíbrio entre maternidade e vida profissional.',
                'tags' => 'trabalho, empreendedorismo, carreira, equilíbrio, mães',
            ],
            [
                'name' => 'Brincadeiras e Estímulos',
                'description' => 'Ideias de brincadeiras educativas e estímulos sensoriais para bebês e crianças pequenas.',
                'tags' => 'brincadeiras, estímulos, infância, aprendizado, criatividade',
            ],
        ];

        foreach ($communities as $community) {
            Community::updateOrCreate(
                ['name' => $community['name']],
                $community
            );
        }
    }
}
