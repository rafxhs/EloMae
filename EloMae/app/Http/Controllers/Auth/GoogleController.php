<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class GoogleController extends Controller
{
    public function redirectToGoogle(Request $request)
    {
        return Socialite::driver('google')->redirect();
    }

    public function handleGoogleCallback(Request $request)
    {

        try {

             $user = Socialite::driver('google')->stateless()->user();
            $user = Socialite::driver('google')->user();
            $findUser = User::where('google_id', $user->id)->first();



          if(!is_null($findUser)){
            Auth::login($findUser);
          } else{
            $findUser = User::create([
              'name' => $user->name,
              'email' => $user->email,
              'google_id' => $user->id,
             'password' => bcrypt(Str::random(16))
            ]);
            Auth::login($findUser);
          }


            return redirect()->route('dashboard');

        } catch (\Exception $e) {
            return redirect('/login')->withErrors(['msg' => "Não foi possível fazer login com o Google, tente novamente."]);

        }
    }
}
