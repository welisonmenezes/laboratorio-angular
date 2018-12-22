<?php
//header('Access-Control-Allow-Origin: *');
//header("Content-Type: application/json; charset=UTF-8");

require_once "Connection.php";
require_once "Posts.php";

$method = $_SERVER['REQUEST_METHOD'];

//var_dump($method);

$posts = new Posts($connection);


switch ($method) {
    case 'PUT':
        parse_str(file_get_contents("php://input"),$post_vars);
        if(isset($post_vars['id']) && !empty($post_vars['id'])){
            echo $posts->updatePost($post_vars);
        }
        break;
    case 'POST':
        echo $posts->addPost($_POST);
        break;
    case 'GET':
        if(isset($_GET['id']) && !empty($_GET['id'])){
            echo $posts->getPost($_GET['id']);
        }else{
            echo $posts->getPosts();
        }
        break;
    case 'DELETE':
        parse_str(file_get_contents("php://input"),$post_vars);
        if(isset($post_vars['id']) && !empty($post_vars['id'])){
            echo $posts->deletePost($post_vars['id']);
        }
        break;
}
exit;