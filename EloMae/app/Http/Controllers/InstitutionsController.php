<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Institutions;
use Psy\VersionUpdater\Installer;

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
    // public function show(string $id)
    // {
    //     return Institutions::findOrFail($id);
    // }
    public function show(Institutions $institution)
    {
        return response()->json($institution);
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
