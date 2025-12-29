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
                'photo' => 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nqc776HnYgNRYIMpl-vYNb4-86vH6yyUXc79caouQAhApkjjjoy2qWSePZj6cynkyqTeRSJTqai9Jl4jxjVA6IDNyfMZkRWdNxLZTohW1xccJ8FluVlg8rrU44I7duxG0fKGWcEfCDiC7M=s680-w680-h510-rw'
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
                'photo' => 'https://creas.me/wp-content/uploads/2019/12/creas.jpg'
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
                'photo' => 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4nrFXDvxhZTPmmmx1YZiENGzSbUQ95Q6mFdXYhWwWsmxN7lGZHDGTHZPC1tkzBFVfrOkVc8HAS4BlDjR-Z6IwSKRl0EERXI6sWCIrgjcrXdgImhfPxQJfR7Y0rIbxn2SgYyF-6ETug=s680-w680-h510-rw'
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
                'photo' => 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Women_support_center.jpg/640px-Women_support_center.jpg'
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
                'photo' => 'https://upload.wikimedia.org/wikipedia/commons/3/3f/NGO_building.jpg'
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
                'photo' => 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Community_center.jpg'
            ],
           
        ];

        foreach ($institutions as $institution) {
            Institutions::create($institution);
        }
    }
}
