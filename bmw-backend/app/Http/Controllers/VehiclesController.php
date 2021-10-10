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
}
