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
                'photo'=>  '/images/institutions/CRAS-igarassu.jpg',
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
           
        ];

        foreach ($institutions as $institution) {
            Institutions::create($institution);
        }
    }
}
