<?php

function getNumFiles($directoryPath) {
	$fileCount = count(scandir($directoryPath));
	return $fileCount - 2; // don't count dot and dotdot
}

function getMediaMapping($mediaRoot) {
	$media_overview = [];

	foreach(new DirectoryIterator($mediaRoot) as $categoryDir) {
		if (!$categoryDir->isDot()) {

			$subCategoryCounts = [];
			foreach(new DirectoryIterator($categoryDir->getPathname()) as $subCategoryDir) {
				if (!$subCategoryDir->isDot()) {
					array_push($subCategoryCounts, getNumFiles($subCategoryDir->getPathname()));
				}
			}

			$media_overview[$categoryDir->getFilename()] = $subCategoryCounts;
		}
	}

	return $media_overview;
}


$mapping = getMediaMapping('./assets/audio');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
echo json_encode($mapping);
//var_dump($mapping);
//print_r($mapping);
//debug_zval_dump($mapping);
//get_defined_vars($mapping);
?>
