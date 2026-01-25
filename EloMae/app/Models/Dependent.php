<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;


class Dependent extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'birth_date',
        'gender',
    ];

    protected $casts = [
        'birth_date' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function phaseNotifications()
    {
        return $this->hasMany(DependentPhaseNotification::class);
    }


    public function ageInMonths(): ?int
    {
        if (! $this->birth_date) {
            return null;
        }

        return (int) $this->birth_date->diffInMonths(Carbon::now(), false);
    }

    public function hasBeenNotifiedForPhase(int $phaseId): bool
    {
        return $this->phaseNotifications()
            ->where('development_phase_id', $phaseId)
            ->exists();
    }
}
