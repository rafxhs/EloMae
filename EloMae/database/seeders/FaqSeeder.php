<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('faqs')->insert([
            // Plataforma
            [
                'question' => 'O que é a plataforma?',
                'answer' => 'É um espaço digital de apoio, informação e conexão para mães.',
                'category' => 'plataforma',
            ],
            [
                'question' => 'Para quem a plataforma é indicada?',
                'answer' => 'Para mães, gestantes e cuidadoras que buscam informação e apoio.',
                'category' => 'plataforma',
            ],
            [
                'question' => 'A plataforma é gratuita?',
                'answer' => 'Sim, o acesso à plataforma é gratuito.',
                'category' => 'plataforma',
            ],
            [
                'question' => 'Preciso criar conta para usar a plataforma?',
                'answer' => 'Alguns recursos exigem cadastro para melhor personalização.',
                'category' => 'plataforma',
            ],
            [
                'question' => 'Quais recursos a plataforma oferece?',
                'answer' => 'Artigos, comunidades, mapa de serviços e suporte personalizado.',
                'category' => 'plataforma',
            ],

            // Artigos
            [
                'question' => 'O que são os artigos?',
                'answer' => 'São conteúdos informativos sobre maternidade e cuidados.',
                'category' => 'artigos',
            ],
            [
                'question' => 'Posso salvar artigos favoritos?',
                'answer' => 'Sim, você pode favoritar artigos para ler depois. Eles estarão disponíveis na página principal após o login.',
                'category' => 'artigos',
            ],
            [
                'question' => 'Os artigos são personalizados?',
                'answer' => 'Sim, podem ser recomendados baseado na fase de desenvolvimento da sua criança.',
                'category' => 'artigos',
            ],
            [
                'question' => 'Com que frequência novos artigos são publicados?',
                'answer' => 'Novos conteúdos são adicionados regularmente.',
                'category' => 'artigos',
            ],

            // Comunidades
            [
                'question' => 'O que são as comunidades?',
                'answer' => 'São espaços para troca de experiências entre mães.',
                'category' => 'comunidades',
            ],
            [
                'question' => 'Como participar de uma comunidade?',
                'answer' => 'Basta entrar na comunidade desejada pela plataforma.',
                'category' => 'comunidades',
            ],
            [
                'question' => 'Posso criar minha própria comunidade?',
                'answer' => 'Atualmente, apenas administradores podem criar comunidades.',
                'category' => 'comunidades',
            ],
            [
                'question' => 'Posso sair de uma comunidade?',
                'answer' => 'Sim, você pode sair e entrar a qualquer momento.',
                'category' => 'comunidades',
            ],

            // Mapa
            [
                'question' => 'Para que serve o mapa?',
                'answer' => 'Ajuda a localizar serviços e apoios próximos.',
                'category' => 'mapa',
            ],
            [
                'question' => 'O mapa usa minha localização?',
                'answer' => 'Somente com sua permissão.',
                'category' => 'mapa',
            ],
            [
                'question' => 'Que tipos de locais aparecem no mapa?',
                'answer' => 'Serviços de saúde, apoio social e outros recursos para mães.',
                'category' => 'mapa',
            ],
            [
                'question' => 'Posso sugerir um local no mapa?',
                'answer' => 'No momento, essa funcionalidade não está disponível.',
                'category' => 'mapa',
            ],
            [
                'question' => 'O mapa funciona em tempo real?',
                'answer' => 'As informações são atualizadas periodicamente.',
                'category' => 'mapa',
            ],

            // Cadastro
            [
                'question' => 'Como faço meu cadastro?',
                'answer' => 'Acesse a página de cadastro e preencha seus dados.',
                'category' => 'cadastro',
            ],
            [
                'question' => 'Quais dados são necessários no cadastro?',
                'answer' => 'Informações básicas para criação da conta.',
                'category' => 'cadastro',
            ],
            [
                'question' => 'Posso alterar meus dados depois?',
                'answer' => 'Sim, pelo perfil do usuário você pode atualizar seus dados a qualquer momento.',
                'category' => 'cadastro',
            ],
            [
                'question' => 'Esqueci minha senha, o que fazer?',
                'answer' => 'Utilize a opção de recuperação de senha.',
                'category' => 'cadastro',
            ],
            [
                'question' => 'Meu cadastro é seguro?',
                'answer' => 'Sim, seus dados são protegidos.',
                'category' => 'cadastro',
            ],
        ]);
    }
}
