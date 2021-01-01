<?php

function getNumFiles($directoryPath) {
	$fileCount = count(scandir($directoryPath));
	return $fileCount - 2; // don't count dot and dotdot
}

function getMediaMapping($mediaRoot) {
	$mediaOverview = [];

	foreach(new DirectoryIterator($mediaRoot) as $categoryDir) {
		if (!$categoryDir->isDot()) {

			$subCategoryCounts = [];
			foreach(range(1, getNumFiles($categoryDir->getPathname())) as $subCategoryDir) {
				$dirPath = $categoryDir->getPathname() . "/" . $subCategoryDir;
				array_push($subCategoryCounts, getNumFiles($dirPath));
			}

			$mediaOverview[$categoryDir->getFilename()] = $subCategoryCounts;
		}
	}

	return $mediaOverview;
}


$mapping = getMediaMapping('./assets/audio');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
echo json_encode($mapping);

?>
