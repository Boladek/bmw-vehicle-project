<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vehicles;
use DB;

class VehiclesController extends Controller
{
    //
    function index() 
    {
        return Vehicles::query()->get();
    }

    function store()
    {
        $file = base_path('csv-files/vehicles_bmw.csv');
        
        $delimiter = ',';

        if (!file_exists($file) || !is_readable($file))
            return false;
    
        $header = null;
        $data = array();
        if (($handle = fopen($file, 'r')) !== false)
        {
            while (($row = fgetcsv($handle, 1000, $delimiter)) !== false)
            {
             
                if (!$header)
                    $header = $row;
                else
                    $data[] = array_combine($header, $row);
            }
            fclose($handle);
        }

        $d[] = collect($data)->map(function($item, $key) {
            Vehicles::create([
                'make' => $item['make'],
                'model' => $item['model'],
                'regDate' => $item['regDate']
            ]);
        });
        return 'Successfully saved data';

    }

    function match (Request $req) 
    {
        $param = $req->input;
        $yourDate = "2009-07-15 00:00:00+00";
        $query = DB::table('vehicles')->where('model', $param)->get();
        dd($query, date('Y', strtotime($yourDate)));
        
    }
}
