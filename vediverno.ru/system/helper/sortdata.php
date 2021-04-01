<?php 
function sortByOrder($a, $b) {
    return  $b['score'] - $a['score'];
}

function sortByScore($a, $b) {
    return $b['team_score'] - $a['team_score'];
}
function sortByMissed($a, $b) {
    return $a['team_score'] - $b['team_score'];
}

function sortByMiss($a, $b) {
    return $a['ball_missing'] - $b['ball_missing'];
}


function sortByDiff($a, $b) {
    return $b['team_game_diff'] - $a['team_game_diff'];
}

function sortByDiffScore($a, $b) {
    if ($a['team_score'] == $b['team_score']) {
        return $b['team_game_diff'] - $a['team_game_diff'];
    }
    return strcmp( $b['team_score'],$a['team_score']);
}