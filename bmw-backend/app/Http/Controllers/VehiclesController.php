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
        $param = $req->typeName;
        $secondParam = $req->model;
        $firstDate = $req->monthOfConstrFrom;
        $secondData = $req->monthOfConstrTo;
        $param = $secondParam . $param;
        // dd($req->getContent());
        $param = str_replace(' ', '', $param);
        $param = str_replace('()', '', $param);
        dd($param);
        $yourDate = "2009-07-15 00:00:00+00";
        $query = DB::table('vehicles')->where('model', strpos($param, 'model'))->get();
        dd($query, date('Y', strtotime($yourDate)));
    }

    public function show(Request $request) {
        //Steps to filter
        //1. Receive vehicle model as query string
        //2. Use either query builder or eloquent to perform a db query to select from vehicles base on "typeName" (Use can use a like operator if you want.)
        //NOTE::In Vehicle model: have a typeName getter that removes any space if any.
        //3. Return result to front end. 
    }
}
