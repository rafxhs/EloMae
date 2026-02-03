<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Institutions;

class InstitutionSeeder extends Seeder
{
    public function run()
    {
        $institutions = [

            [
                'name' => 'CRAS - José Roberto de Souza',
                'type' => 'CRAS',
                'address' => 'Rod. Governador Mário Covas, 398 - Santa Maria, Igarassu - PE',
                'lat' => -7.874007,
                'lng' => -34.906557,
                'phone' => '(81) 99224-4991',
                'opening_hours' => 'Seg a Sex, 08h - 16h',
                'services' => 'Acolhida, Escuta qualificada, CadÚnico, Bolsa Família, BPC, SCFV, Oficinas, Ações comunitárias',
                'photo' =>  '/images/institutions/CRAS-igarassu.jpg',
            ],

            [
                'name' => 'CREAS - Centro de Referência Especializado',
                'type' => 'CREAS',
                'address' => 'R. Santina Gomes de Andrade, 19 - Centro, Igarassu - PE',
                'lat' => -7.83417,
                'lng' => -34.90639,
                'phone' => '(81) 99145-9086',
                'opening_hours' => 'Seg a Sex, 08h - 16h',
                'services' => 'Apoio psicossocial, orientação jurídica, escuta qualificada, prevenção de violações',
                'photo' => '/images/institutions/creas.jpg'
            ],

            [
                'name' => '5ª Delegacia da Mulher (DREAM)',
                'type' => 'Delegacia',
                'address' => 'R. Francisco Santiago da Costa, 2 - Centro, Paulista - PE',
                'lat' => -7.93442,
                'lng' => -34.868727,
                'phone' => '(81) 3184-7075',
                'opening_hours' => 'Atendimento 24h',
                'services' => 'BO, medidas protetivas, investigação, acolhimento, encaminhamento jurídico',
                'photo' => '/images/institutions/delegaciaMulher.jpg'
            ],

            [
                'name' => 'Secretaria da Mulher de Igarassu',
                'type' => 'Secretaria',
                'address' => 'Rua Joaquim Nabuco, 122 - Centro, Igarassu - PE',
                'lat' => -7.91167,
                'lng' => -34.90278,
                'phone' => '(81) 99128-8464',
                'opening_hours' => 'Seg a Sex, 07h - 13h',
                'services' => 'Acolhimento, apoio psicossocial, assistência jurídica, autonomia econômica',
                'photo' => '/images/institutions/prefeitura.jpg'
            ],

            [
                'name' => 'Prefeitura de Igarassu',
                'type' => 'Prefeitura',
                'address' => 'Rua Joaquim Nabuco, 122 - Centro, Igarassu - PE',
                'lat' => -7.91167,
                'lng' => -34.90278,
                'phone' => '(81) 3543-0729',
                'opening_hours' => 'Seg a Sex, 07h - 13h',
                'services' => 'Saúde, educação, assistência social, infraestrutura, transporte, cultura, meio ambiente e segurança',
                'photo' => '/images/institutions/prefeitura.jpg'
            ],

            [
                'name' => 'Unidade de Saúde da Família (USF)',
                'type' => 'Saúde',
                'address' => ' Av. Alfredo Bandeira de Melo - Centro, Igarassu - PE, 53610-000',
                'lat' => -7.83417,
                'lng' => -34.90639,
                'phone' => '(81) 9 9128-8464',
                'opening_hours' => 'Seg a Sex, 07h - 13h',
                'services' => 'Consultas médicas, de enfermagem e odontológicas, vacinação, pré-natal, e acompanhamento de crianças, adolescentes, adultos e idosos.',
                'photo' => '/images/institutions/UFS-igarassu.jpg'
            ],

            [
                'name' => 'ONG Vozes do Norte',
                'type' => 'ONG',
                'address' => 'Rua das Flores, Centro, Igarassu - PE',
                'lat' => -7.9102,
                'lng' => -34.9041,
                'phone' => '(81) 98888-1111',
                'opening_hours' => 'Seg a Sex, 09h - 17h',
                'services' => 'Apoio psicológico, oficinas educativas, acolhimento feminino',
                'photo' => '/images/institutions/ong-exemplo.jpg'
            ],
            [
                'name' => 'Centro Comunitário Esperança',
                'type' => 'ONG',
                'address' => 'Av. Brasil, 210 - Igarassu',
                'lat' => -7.9125,
                'lng' => -34.9009,
                'phone' => '(81) 97777-2222',
                'opening_hours' => 'Seg a Sex, 08h - 16h',
                'services' => 'Cursos, palestras, apoio social',
                'photo' => '/images/institutions/ong-exemplo2.png'
            ],

            [
                'name' => 'Escola Municipal José Bezerra',
                'type' => 'Educação',
                'address' => 'Rua das Flores, 120 - Centro, Igarassu-PE',
                'lat' => -7.82923,
                'lng' => -34.92239,
                'phone' => '(81) 98811-2233',
                'opening_hours' => 'Seg a Sex, 07h - 17h',
                'services' => 'Ensino fundamental, atividades pedagógicas',
                'photo' => '/images/institutions/escola-1.jpeg'
            ],
            [
                'name' => 'Creche Municipal Pequeno Saber',
                'type' => 'Educação',
                'address' => 'Av. João Pessoa, 85 - Cruz de Rebouças, Igarassu-PE',
                'lat' => -7.80487,
                'lng' => -34.93224,
                'phone' => '(81) 98722-3344',
                'opening_hours' => 'Seg a Sex, 07h - 16h',
                'services' => 'Educação infantil, alimentação escolar',
                'photo' => '/images/institutions/creche-1.jpg'
            ],
            [
                'name' => 'Escola Municipal Maria da Penha',
                'type' => 'Educação',
                'address' => 'Rua Nova Esperança, 310 - Saramandaia, Igarassu-PE',
                'lat' => -7.84872,
                'lng' => -34.91156,
                'phone' => '(81) 98633-4455',
                'opening_hours' => 'Seg a Sex, 07h - 17h',
                'services' => 'Ensino fundamental, reforço escolar',
                'photo' => '/images/institutions/escola-2.jpg'
            ],
            [
                'name' => 'Creche Municipal Doce Infância',
                'type' => 'Educação',
                'address' => 'Rua das Acácias, 60 - Bela Vista, Igarassu-PE',
                'lat' => -7.82437,
                'lng' => -34.90773,
                'phone' => '(81) 98544-5566',
                'opening_hours' => 'Seg a Sex, 07h - 16h',
                'services' => 'Educação infantil, apoio pedagógico',
                'photo' => '/images/institutions/creche-2.jpg'
            ],
            [
                'name' => 'UBS Centro de Igarassu',
                'type' => 'Saúde',
                'address' => 'Av. Duarte Coelho, 200 - Centro, Igarassu-PE',
                'lat' => -7.83135,
                'lng' => -34.90151,
                'phone' => '(81) 98455-6677',
                'opening_hours' => 'Seg a Sex, 08h - 16h',
                'services' => 'Atendimento médico, enfermagem, vacinação',
                'photo' => '/images/institutions/ubs-1.jpg'
            ],
            [
                'name' => 'Posto de Saúde São Lucas',
                'type' => 'Saúde',
                'address' => 'Rua São Lucas, 145 - Triunfo, Igarassu-PE',
                'lat' => -7.82472,
                'lng' => -34.91608,
                'phone' => '(81) 98366-7788',
                'opening_hours' => 'Seg a Sex, 08h - 16h',
                'services' => 'Consultas básicas, pré-natal',
                'photo' => '/images/institutions/posto-1.jpg'
            ],
            [
                'name' => 'UBS Bela Vista',
                'type' => 'Saúde',
                'address' => 'Rua Bela Vista, 90 - Bela Vista, Igarassu-PE',
                'lat' => -7.86376,
                'lng' => -34.90479,
                'phone' => '(81) 98277-8899',
                'opening_hours' => 'Seg a Sex, 08h - 16h',
                'services' => 'Atendimento ambulatorial e vacinação',
                'photo' => '/images/institutions/posto-3.jpg'
            ],
            [
                'name' => 'Posto de Saúde Cruz de Rebouças',
                'type' => 'Saúde',
                'address' => 'Av. Principal, 410 - Cruz de Rebouças, Igarassu-PE',
                'lat' => -7.84424,
                'lng' => -34.90558,
                'phone' => '(81) 98188-9900',
                'opening_hours' => 'Seg a Sex, 08h - 16h',
                'services' => 'Clínico geral, enfermagem',
                'photo' => '/images/institutions/posto-2.jpg'
            ],
            [
                'name' => 'Centro Comunitário Esperança',
                'type' => 'ONG',
                'address' => 'Rua da Paz, 210 - Centro, Igarassu-PE',
                'lat' => -7.85607,
                'lng' => -34.90517,
                'phone' => '(81) 97777-2222',
                'opening_hours' => 'Seg a Sex, 08h - 16h',
                'services' => 'Cursos, palestras, apoio social',
                'photo' => '/images/institutions/ong-1.jpg'
            ],
            [
                'name' => 'Instituto Mãos Solidárias',
                'type' => 'ONG',
                'address' => 'Rua da Solidariedade, 55 - Saramandaia, Igarassu-PE',
                'lat' => -7.81535,
                'lng' => -34.92432,
                'phone' => '(81) 97666-3333',
                'opening_hours' => 'Seg a Sex, 09h - 17h',
                'services' => 'Apoio social, oficinas comunitárias',
                'photo' => '/images/institutions/ong-2.png'
            ],
        ];


        foreach ($institutions as $institution) {
            Institutions::create($institution);
        }
    }
}
