<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Amamentação',
            'Introdução Alimentar',
            'Pré-natal',
            'Vacinas',
            'Benefícios para Gestantes',
            'Direitos da Gestante',
            'Direitos da Mãe Trabalhadora',
            'Puericultura',
            'Saúde Mental Pós-parto',
            'Cuidados com o Bebê',
            'Parto e Tipos de Parto',
            'Apoio à Maternidade Solo',
            'Desenvolvimento do Bebê',
            'Planejamento Familiar',
            'Amamentação em Público',
            'Aleitamento Materno Exclusivo',
            'Retorno ao Trabalho e Amamentação',
            'Cuidado com o Sono do Bebê',
            'Lactação e Produção de Leite',
            'Cuidados Pós-parto',
        ];

        foreach ($categories as $name) {
            Category::firstOrCreate(['name' => $name]);
        }
    }
}

