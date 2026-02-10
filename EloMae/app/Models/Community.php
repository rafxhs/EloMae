<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Community extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'tags',
        'created_by',
    ];

    protected $casts = [
        'tags' => 'array', // converte JSON <-> array automaticamente
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'community_user')
         ->withPivot('last_read_at')
        ->withTimestamps();
    }

    protected $appends = ['members_count'];

    public function getMembersCountAttribute()
    {
        return $this->users()->count();
    }


}
