<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;
use App\Models\DevelopmentPhase;
use App\Models\Category;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        $phases = DevelopmentPhase::all()->keyBy(function ($phase) {
            return "{$phase->start_month}-{$phase->end_month}";
        });

        $categories = Category::all()->keyBy('name');

        $longContent = function (string $topic) {
            return "Este artigo aborda {$topic} de maneira prática, acolhedora e baseada no desenvolvimento infantil. Ao longo do conteúdo, são apresentados exemplos do cotidiano, orientações possíveis de serem aplicadas na rotina familiar e reflexões que ajudam mães e cuidadores a compreenderem melhor essa fase do bebê. É importante lembrar que cada criança possui seu próprio ritmo, e que comparação excessiva pode gerar insegurança desnecessária. O texto reforça a importância do vínculo, da observação atenta e do respeito às necessidades emocionais e físicas da criança, promovendo segurança, confiança e bem-estar para toda a família.";
        };

        $articles = [
            ['0-1','Adaptação ao Pós-parto','Primeiros dias com o bebê','Entenda o período inicial',$longContent('a adaptação pós-parto'),'Cuidados Pós-parto'],
            ['0-1','Sono do Recém-nascido',null,'Como funciona o sono',$longContent('o sono do recém-nascido'),'Cuidado com o Sono do Bebê'],
            ['0-1','Amamentação nos Primeiros Dias','Expectativas reais','Começando a amamentar',$longContent('a amamentação inicial'),'Amamentação'],
            ['0-1','Rede de Apoio Materna',null,'Você não precisa dar conta sozinha',$longContent('a importância da rede de apoio'),'Saúde Mental Pós-parto'],
            ['0-1','Cuidados Básicos com o Bebê',null,'Troca, banho e conforto',$longContent('os cuidados básicos'),'Cuidados com o Bebê'],

            ['2-3','Primeiros Sorrisos','Vínculo e interação','O que eles significam',$longContent('os sorrisos sociais'),'Desenvolvimento do Bebê'],
            ['2-3','Estimulação Visual',null,'Cores e contrastes',$longContent('a estimulação visual'),'Desenvolvimento do Bebê'],
            ['2-3','Reconhecimento de Vozes',null,'A voz como referência',$longContent('o reconhecimento auditivo'),'Desenvolvimento do Bebê'],
            ['2-3','Rotina Flexível',null,'Organização sem rigidez',$longContent('a criação de rotina'),'Puericultura'],
            ['2-3','Brincadeiras Simples',null,'Interação no dia a dia',$longContent('o brincar inicial'),'Desenvolvimento do Bebê'],

            ['4-5','Descoberta do Corpo',null,'Mãos, pés e movimentos',$longContent('a descoberta corporal'),'Desenvolvimento do Bebê'],
            ['4-5','Exploração Sensorial',null,'Texturas e objetos',$longContent('a exploração sensorial'),'Desenvolvimento do Bebê'],
            ['4-5','Virar e Rolar',null,'Novos movimentos',$longContent('os marcos motores'),'Desenvolvimento do Bebê'],
            ['4-5','Ambiente Seguro',null,'Espaço para explorar',$longContent('a segurança do ambiente'),'Cuidados com o Bebê'],
            ['4-5','Interação com Espelho',null,'Autopercepção',$longContent('a percepção corporal'),'Desenvolvimento do Bebê'],

            ['6-7','Balbucios',null,'Comunicação em formação',$longContent('os balbucios'),'Desenvolvimento do Bebê'],
            ['6-7','Reconhecimento de Pessoas',null,'Vínculo afetivo',$longContent('o reconhecimento de cuidadores'),'Desenvolvimento do Bebê'],
            ['6-7','Brincadeiras Vocais',null,'Troca de sons',$longContent('a comunicação vocal'),'Desenvolvimento do Bebê'],
            ['6-7','Rotina como Segurança',null,'Previsibilidade',$longContent('a previsibilidade diária'),'Puericultura'],
            ['6-7','Exploração Assistida',null,'Autonomia com apoio',$longContent('a exploração guiada'),'Desenvolvimento do Bebê'],

            ['8-9','Ansiedade de Separação',null,'Apego e estranhamento',$longContent('a ansiedade de separação'),'Saúde Mental Pós-parto'],
            ['8-9','Estranhamento',null,'Reação a desconhecidos',$longContent('o estranhamento'),'Desenvolvimento do Bebê'],
            ['8-9','Apego Seguro',null,'Base emocional',$longContent('o apego seguro'),'Desenvolvimento do Bebê'],
            ['8-9','Acolhendo Emoções',null,'Presença e apoio',$longContent('o acolhimento emocional'),'Saúde Mental Pós-parto'],
            ['8-9','Rotina como Apoio',null,'Conforto emocional',$longContent('a rotina estruturada'),'Puericultura'],

            ['10-12','Engatinhar',null,'Movimento e curiosidade',$longContent('o engatinhar'),'Desenvolvimento do Bebê'],
            ['10-12','Ficar em Pé',null,'Novas conquistas',$longContent('as tentativas de ficar em pé'),'Desenvolvimento do Bebê'],
            ['10-12','Introdução Alimentar','Primeiros alimentos','Como começar',$longContent('a introdução alimentar'),'Introdução Alimentar'],
            ['10-12','Exploração da Casa',null,'Ambiente adaptado',$longContent('a exploração do ambiente'),'Cuidados com o Bebê'],
            ['10-12','Comunicação Gestual',null,'Apontar e pedir',$longContent('a comunicação gestual'),'Desenvolvimento do Bebê'],
        ];

        foreach ($articles as $article) {
            Article::create([
                'development_phase_id' => $phases[$article[0]]->id,
                'title' => $article[1],
                'subtitle' => $article[2],
                'summary' => $article[3],
                'content' => $article[4],
                'author_id' => 1,
                'tags' => 'maternidade, desenvolvimento infantil',
                'category_id' => $categories[$article[5]]->id,
            ]);
        }
    }
}
