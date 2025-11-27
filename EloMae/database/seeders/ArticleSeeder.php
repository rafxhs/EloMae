<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Article;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Article::create([
            'title' => 'Os Primeiros Dias com o Bebê',
            'subtitle' => 'Adaptação, rotina e emoções',
            'summary' => 'Um guia acolhedor para ajudar mães nos primeiros dias após o parto, abordando cuidados básicos e aspectos emocionais.',
            'content' => 'Os primeiros dias com o bebê costumam ser um turbilhão de sentimentos. Entre noites curtas e muitas descobertas, cada mãe encontra seu ritmo. Neste artigo, exploramos cuidados essenciais, amamentação, sono e como lidar com expectativas.',
            'author_id' => 1,
            'tags' => 'recém-nascido, cuidados, amamentação'
        ]);

        Article::create([
            'title' => 'Amamentação Sem Pressão',
            'subtitle' => 'Encontrando conforto e apoio',
            'summary' => 'Reflexões e orientações práticas sobre amamentação, desmontando mitos e oferecendo alternativas seguras.',
            'content' => 'A amamentação pode ser maravilhosa, mas também pode trazer dificuldades. É normal sentir dor, insegurança ou cansaço. Este artigo apresenta técnicas de pega, posições, quando buscar ajuda e alternativas como complemento e ordenha.',
            'author_id' => 1,
            'tags' => 'amamentação, saúde, maternidade real'
        ]);

        Article::create([
            'title' => 'A Rotina do Sono Infantil',
            'subtitle' => null,
            'summary' => 'Como entender os ciclos de sono do bebê e estabelecer hábitos mais tranquilos.',
            'content' => 'O sono infantil segue padrões próprios, muitas vezes diferentes das expectativas dos adultos. Entender janelas de sono, sinais de cansaço e criar um ambiente adequado pode ajudar a tornar as noites mais leves.',
            'author_id' => 1,
            'tags' => 'sono, rotina, bebês'
        ]);


        Article::create([
            'title' => 'Introdução Alimentar Sem Mistérios',
            'subtitle' => 'BLW, papinhas e sinais de prontidão',
            'summary' => 'Um panorama completo sobre os métodos de introdução alimentar e como identificar o momento ideal para começar.',
            'content' => 'A introdução alimentar costuma gerar dúvidas: qual método seguir, quando começar e como lidar com possíveis rejeições. Este artigo explica sinais de prontidão, diferenças entre o método tradicional e o BLW, além de exemplos práticos de primeiros alimentos.',
            'author_id' => 1,
            'tags' => 'alimentação, BLW, papinhas'
        ]);

        Article::create([
            'title' => 'Cuidando da Saúde Mental na Maternidade',
            'subtitle' => 'Identificando sobrecarga e acolhendo emoções',
            'summary' => 'Uma conversa necessária sobre o peso emocional que muitas mães enfrentam e caminhos possíveis de cuidado.',
            'content' => 'A maternidade pode trazer sentimentos contraditórios. Nem sempre é fácil lidar com cansaço, expectativas e mudanças na rotina. Este artigo aborda sinais de alerta para esgotamento, como buscar apoio e práticas que ajudam a fortalecer a saúde emocional.',
            'author_id' => 1,
            'tags' => 'saúde mental, maternidade real, autocuidado'
        ]);

        Article::create([
            'title' => 'Desenvolvimento do Bebê Mês a Mês',
            'subtitle' => null,
            'summary' => 'Um guia dos principais marcos de desenvolvimento durante o primeiro ano de vida.',
            'content' => 'Cada bebê tem seu ritmo, mas existem marcos gerais que ajudam a acompanhar o crescimento. Exploramos habilidades motoras, linguagem, interação social e estímulos adequados para cada fase, sempre lembrando que variações são normais.',
            'author_id' => 1,
            'tags' => 'desenvolvimento, bebês, primeiros meses'
        ]);
    }
}
