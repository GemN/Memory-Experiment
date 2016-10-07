<?php
/**
 * Created by PhpStorm.
 * User: gem
 * Date: 07/10/2016
 * Time: 13:40
 */

$json = json_decode(stripslashes($_POST['json']), true);

$fileID = uniqid();
$file = fopen("subjectsData/" . $fileID . ".csv", "w");

fputcsv($file, array('Group', 'Test Type', 'Word', 'Pressed', 'Accurate', 'Time'));
foreach ($json["readData"] as $data) {
    fputcsv($file, array(
        $json["group"],
        "Read",
        $data["word"],
        $data["space"] ? "yes" : "no",
        $data["accurate"] ? "yes" : "no",
        $data["time"])
    );
}
var_dump($json["stats"]);
fputcsv($file, array('Total', '', '', '', $json["stats"]["read"]["accuracy"], $json["stats"]["read"]["time"]));

foreach ($json["audioData"] as $data) {
    fputcsv($file, array(
            $json["group"],
            "Audio",
            $data["word"],
            $data["space"] ? "yes" : "no",
            $data["accurate"] ? "yes" : "no",
            $data["time"])
    );
}
fputcsv($file, array('Total', '', '', '', $json["stats"]["audio"]["accuracy"], $json["stats"]["audio"]["time"]));

fclose($file);
