<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;
use App\Models\DevelopmentPhase;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        // Mapeia fases por intervalo (forma segura)
        $phases = DevelopmentPhase::all()->keyBy(function ($phase) {
            return "{$phase->start_month}-{$phase->end_month}";
        });

        Article::create([
            'title' => 'Os Primeiros Dias com o Bebê',
            'subtitle' => 'Adaptação, rotina e emoções',
            'summary' => 'Um guia acolhedor para ajudar mães nos primeiros dias após o parto.',
            'content' => 'Os primeiros dias com o bebê costumam ser intensos. Falamos sobre cuidados básicos, amamentação, sono e emoções.',
            'author_id' => 1,
            'tags' => 'recém-nascido, cuidados, maternidade',
            'development_phase_id' => $phases['0-1']->id,
        ]);

        Article::create([
            'title' => 'Amamentação Sem Pressão',
            'subtitle' => 'Encontrando conforto e apoio',
            'summary' => 'Orientações práticas e acolhedoras sobre amamentação.',
            'content' => 'A amamentação pode ser desafiadora. Este artigo aborda pega, dor, apoio e alternativas possíveis.',
            'author_id' => 1,
            'tags' => 'amamentação, saúde, maternidade real',
            'development_phase_id' => $phases['0-1']->id,
        ]);

        Article::create([
            'title' => 'Entendendo os Primeiros Sorrisos',
            'subtitle' => 'Interação e vínculo',
            'summary' => 'Como interpretar os primeiros sinais de interação social do bebê.',
            'content' => 'Os sorrisos sociais fortalecem o vínculo e indicam desenvolvimento emocional.',
            'author_id' => 1,
            'tags' => 'desenvolvimento, vínculo, bebês',
            'development_phase_id' => $phases['2-3']->id,
        ]);

        Article::create([
            'title' => 'A Rotina do Sono Infantil',
            'subtitle' => 'Criando hábitos possíveis',
            'summary' => 'Entendendo os ciclos de sono e sinais de cansaço.',
            'content' => 'Falamos sobre janelas de sono, ambiente e expectativas realistas.',
            'author_id' => 1,
            'tags' => 'sono, rotina, bebês',
            'development_phase_id' => $phases['4-5']->id,
        ]);

        Article::create([
            'title' => 'Ansiedade de Separação: o que esperar',
            'subtitle' => null,
            'summary' => 'Como lidar com o estranhamento e o apego intenso.',
            'content' => 'Essa fase é comum e faz parte do desenvolvimento emocional.',
            'author_id' => 1,
            'tags' => 'apego, emoções, desenvolvimento',
            'development_phase_id' => $phases['8-9']->id,
        ]);

        Article::create([
            'title' => 'Introdução Alimentar Sem Mistérios',
            'subtitle' => 'BLW, papinhas e sinais de prontidão',
            'summary' => 'Guia prático para começar a alimentação complementar.',
            'content' => 'Explicamos métodos, sinais de prontidão e exemplos práticos.',
            'author_id' => 1,
            'tags' => 'alimentação, BLW, bebês',
            'development_phase_id' => $phases['10-12']->id,
        ]);

        Article::create([
            'title' => 'Primeiros Passos e Segurança',
            'subtitle' => null,
            'summary' => 'Como apoiar o início da marcha com segurança.',
            'content' => 'Dicas para estimular sem pressão e adaptar o ambiente.',
            'author_id' => 1,
            'tags' => 'andar, desenvolvimento motor',
            'development_phase_id' => $phases['13-15']->id,
        ]);

        Article::create([
            'title' => 'Quando as Primeiras Palavras Surgem',
            'subtitle' => 'Comunicação em construção',
            'summary' => 'Entenda como a linguagem começa a se formar.',
            'content' => 'Gestos, sons e palavras fazem parte da comunicação inicial.',
            'author_id' => 1,
            'tags' => 'linguagem, desenvolvimento',
            'development_phase_id' => $phases['16-18']->id,
        ]);

        Article::create([
            'title' => 'Autonomia, Birras e Limites',
            'subtitle' => null,
            'summary' => 'Como lidar com frustrações e limites.',
            'content' => 'A autonomia cresce junto com emoções intensas.',
            'author_id' => 1,
            'tags' => 'birras, autonomia, educação',
            'development_phase_id' => $phases['19-24']->id,
        ]);

        Article::create([
            'title' => 'Imaginação e Brincadeiras',
            'subtitle' => 'Aprender brincando',
            'summary' => 'O papel do brincar no desenvolvimento cognitivo.',
            'content' => 'Brincadeiras simbólicas ajudam no desenvolvimento emocional e social.',
            'author_id' => 1,
            'tags' => 'brincar, imaginação, desenvolvimento',
            'development_phase_id' => $phases['25-36']->id,
        ]);
    }
}
