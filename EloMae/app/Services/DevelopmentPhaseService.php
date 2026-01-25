<?php

namespace App\Services;

use App\Models\Dependent;
use App\Models\DevelopmentPhase;

class DevelopmentPhaseService
{
  
    public function getCurrentPhaseForDependent(Dependent $dependent): ?DevelopmentPhase
    {
        $ageInMonths = $dependent->ageInMonths();

        if ($ageInMonths === null) {
            return null;
        }

        return DevelopmentPhase::where('start_month', '<=', $ageInMonths)
            ->where('end_month', '>=', $ageInMonths)
            ->orderBy('start_month') // segurança extra
            ->first();
    }
}
