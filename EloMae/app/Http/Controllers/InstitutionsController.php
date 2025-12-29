<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Institutions;
use Psy\VersionUpdater\Installer;
use Inertia\Inertia;

class InstitutionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
        public function index()
    {
        return Institutions::select(
            'id',
            'name',
            'address',
            'lat',
            'lng',
            'type'
        )->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        return Institutions::create($request->all());
    }

    /**
     * Display the specified resource.
     */
  
    public function show(InstitutionS $institution)
        {
            return Inertia::render('Institutions/Show', [
            'institution' => $institution
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
