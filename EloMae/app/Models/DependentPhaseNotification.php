<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DependentPhaseNotification extends Model
{
    protected $table = 'dep_phase_noti'; // ← AJUSTE AQUI

    public $timestamps = false;

    protected $fillable = [
        'dependent_id',
        'development_phase_id',
        'notified_at',
    ];

    public function dependent()
    {
        return $this->belongsTo(Dependent::class);
    }

    public function developmentPhase()
    {
        return $this->belongsTo(DevelopmentPhase::class);
    }
}
