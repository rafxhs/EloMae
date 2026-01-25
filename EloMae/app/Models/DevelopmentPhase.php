<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DevelopmentPhase extends Model
{
    protected $fillable = [
        'title',
        'start_month',
        'end_month',
        'description',
    ];

    /**
     * Verifica se a fase cobre uma determinada idade (em meses).
     */
    public function coversMonth(int $ageInMonths): bool
    {
        return $ageInMonths >= $this->start_month
            && $ageInMonths <= $this->end_month;
    }

    public function articles()
{
    return $this->hasMany(Article::class);
}

}
