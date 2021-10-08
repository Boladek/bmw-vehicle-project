<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\vehicleType;
use DB;


class VehicleTypesController extends Controller
{
    function index() {
        return vehicleType::query()->get();
    }

    function store()
    {
        $file = base_path('csv-files/vehicle_types.csv');
        
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
            vehicleType::create($item);
        });
        return 'Successfully saved data';

    }
}