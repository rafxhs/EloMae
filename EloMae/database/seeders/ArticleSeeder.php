<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;
use App\Models\DevelopmentPhase;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        $phases = DevelopmentPhase::all()->keyBy(function ($phase) {
            return "{$phase->start_month}-{$phase->end_month}";
        });

        $longContent = function (string $theme) {
            return "Este artigo aborda {$theme} de forma acolhedora e realista, considerando as necessidades emocionais, físicas e práticas que surgem nessa fase do desenvolvimento infantil. Cada bebê possui seu próprio ritmo, e compreender isso ajuda mães e cuidadores a lidarem com expectativas irreais, comparações e pressões externas. Ao longo do texto, são apresentados exemplos do dia a dia, orientações baseadas em desenvolvimento infantil e reflexões que fortalecem o vínculo entre cuidador e criança. O objetivo é oferecer informação sem julgamento, promovendo segurança, autonomia e conexão afetiva, sempre respeitando os limites da família e do bebê.";
        };

        $articles = [
            ['0-1','Adaptação nos Primeiros Dias','Rotina inicial','Primeiros cuidados',$longContent('a adaptação do recém-nascido')],
            ['0-1','Sono do Recém-nascido','Expectativas reais','Entenda o sono',$longContent('o sono nos primeiros meses')],
            ['0-1','Amamentação e Emoções','Corpo e mente','Vínculo e desafios',$longContent('a amamentação sem pressão')],
            ['0-1','Choro do Bebê','Comunicação inicial','O que o choro diz',$longContent('o choro como forma de comunicação')],
            ['0-1','Rede de Apoio','Você não está sozinha','Apoio materno',$longContent('a importância da rede de apoio')],

            ['2-3','Primeiros Sorrisos','Interação social','Conexão afetiva',$longContent('os sorrisos sociais')],
            ['2-3','Estimulação Visual','O mundo em foco','Desenvolvimento visual',$longContent('a visão do bebê')],
            ['2-3','Vozes e Sons','Reconhecimento auditivo','Atenção sonora',$longContent('os estímulos sonoros')],
            ['2-3','Brincar com o Bebê','Interação simples','Brincadeiras iniciais',$longContent('o brincar nos primeiros meses')],
            ['2-3','Rotina Flexível','Sem rigidez','Organização possível',$longContent('a construção de rotina')],

            ['4-5','Descoberta das Mãos','Exploração corporal','Coordenação',$longContent('a exploração do próprio corpo')],
            ['4-5','Objetos e Texturas','Sentidos em ação','Aprendizado sensorial',$longContent('a exploração sensorial')],
            ['4-5','Virar e Rolar','Movimento livre','Desenvolvimento motor',$longContent('o desenvolvimento motor')],
            ['4-5','Interação com o Espelho','Autopercepção','Curiosidade',$longContent('o reconhecimento corporal')],
            ['4-5','Ambiente Seguro','Espaço de exploração','Segurança',$longContent('a segurança no ambiente')],

            ['6-7','Balbucios','Pré-linguagem','Comunicação',$longContent('o desenvolvimento da linguagem')],
            ['6-7','Reconhecendo Pessoas','Vínculo afetivo','Familiaridade',$longContent('o reconhecimento de cuidadores')],
            ['6-7','Brincadeiras Sonoras','Sons e respostas','Interação',$longContent('a troca vocal')],
            ['6-7','Introdução à Rotina','Previsibilidade','Segurança',$longContent('a previsibilidade diária')],
            ['6-7','Exploração Guiada','Autonomia assistida','Descobertas',$longContent('a exploração com apoio')],

            ['8-9','Ansiedade de Separação','Apego seguro','Entendendo a fase',$longContent('a ansiedade de separação')],
            ['8-9','Estranhamento','Novos rostos','Reações emocionais',$longContent('o estranhamento')],
            ['8-9','Apego e Segurança','Presença constante','Base segura',$longContent('o apego emocional')],
            ['8-9','Como Acolher','Sem pressa','Acolhimento',$longContent('o acolhimento emocional')],
            ['8-9','Rotina como Apoio','Previsibilidade','Conforto',$longContent('a rotina como suporte')],

            ['10-12','Engatinhar','Movimento e curiosidade','Exploração',$longContent('o engatinhar')],
            ['10-12','Ficar em Pé','Novas conquistas','Equilíbrio',$longContent('as tentativas de ficar em pé')],
            ['10-12','Alimentação Complementar','Novos sabores','Introdução alimentar',$longContent('a alimentação complementar')],
            ['10-12','Explorar a Casa','Ambiente seguro','Descobertas',$longContent('a exploração do ambiente')],
            ['10-12','Comunicação Gestual','Apontar e pedir','Intenção',$longContent('a comunicação não verbal')],

            ['13-15','Primeiros Passos','Autonomia motora','Movimento',$longContent('os primeiros passos')],
            ['13-15','Quedas e Aprendizado','Tentativa e erro','Confiança',$longContent('as quedas no aprendizado')],
            ['13-15','Ambiente Adaptado','Segurança','Exploração',$longContent('a adaptação do espaço')],
            ['13-15','Estimular sem Pressão','Respeito ao ritmo','Apoio',$longContent('o estímulo saudável')],
            ['13-15','Confiança Corporal','Segurança interna','Autonomia',$longContent('a confiança motora')],

            ['16-18','Primeiras Palavras','Linguagem emergente','Comunicação',$longContent('as primeiras palavras')],
            ['16-18','Gestos e Sons','Expressão','Interação',$longContent('a comunicação multimodal')],
            ['16-18','Compreensão Simples','Pedidos e respostas','Entendimento',$longContent('a compreensão verbal')],
            ['16-18','Leitura Compartilhada','Livros e vínculo','Estimulação',$longContent('a leitura na infância')],
            ['16-18','Nomear o Mundo','Vocabulário','Aprendizado',$longContent('a ampliação do vocabulário')],

            ['19-24','Birras','Emoções intensas','Regulação',$longContent('as birras')],
            ['19-24','Autonomia','Eu faço sozinho','Independência',$longContent('o desejo de autonomia')],
            ['19-24','Limites com Afeto','Segurança emocional','Educação',$longContent('os limites saudáveis')],
            ['19-24','Frustração','Aprender a esperar','Desenvolvimento',$longContent('a frustração')],
            ['19-24','Consistência','Previsibilidade','Confiança',$longContent('a consistência na rotina')],

            ['25-36','Brincar de Faz de Conta','Imaginação','Criatividade',$longContent('o brincar simbólico')],
            ['25-36','Expansão da Linguagem','Frases e histórias','Comunicação',$longContent('a linguagem expandida')],
            ['25-36','Interação Social','Outras crianças','Convivência',$longContent('a socialização')],
            ['25-36','Expressar Emoções','Nomear sentimentos','Empatia',$longContent('a expressão emocional')],
            ['25-36','Autonomia no Dia a Dia','Pequenas escolhas','Independência',$longContent('a autonomia prática')],
        ];

        foreach ($articles as $article) {
            Article::create([
                'title' => $article[1],
                'subtitle' => $article[2],
                'summary' => $article[3],
                'content' => $article[4],
                'author_id' => 1,
                'tags' => 'desenvolvimento infantil, maternidade',
                'development_phase_id' => $phases[$article[0]]->id,
            ]);
        }
    }
}
