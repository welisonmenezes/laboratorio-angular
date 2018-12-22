<?php
class Posts{

	private $_conn;

	function __construct($connection){
		$this->_conn = $connection->getConn();
	}

	public function getPosts(){
		$query = "SELECT * FROM `user`";
		$result = $this->_conn->prepare($query);
		$result->execute();
		$posts = array();
		while ($row = $result->fetch(PDO::FETCH_ASSOC)){
			array_push($posts, $row);
		}
		return json_encode($posts);
	}

	public function getPost($id){
		$query = "SELECT * FROM `user` WHERE `id` = " . $id;
		$result = $this->_conn->prepare($query);
		$result->execute();
		$row = $result->fetch(PDO::FETCH_ASSOC);
		return json_encode($row);
	}

	public function addPost($post){
		$query = "INSERT INTO `user` (name, email, telefone, arquivo1, arquivo2) VALUES ('".$post['name']."', '".$post['email']."', '".$post['phone']."', '".$post['file1']."', '".$post['file2']."')";
		if($this->_conn->query($query) === TRUE){
			$ret = array('data'=>'success');
		}else{
			$ret = array('data'=>'success');
		}
		return json_encode($ret);
	}

	public function updatePost($post){
		$query = "UPDATE `user` SET name='".$post['name']."', email='".$post['email']."', telefone='".$post['phone']."', arquivo1='".$post['file1']."', arquivo2='".$post['file2']."' WHERE ID = " . $post['id'];
		if($this->_conn->query($query) === TRUE){
			$ret = array('data'=>'success');
		}else{
			$ret = array('data'=>'success');
		}
		return json_encode($ret);
	}

	public function deletePost($id){
		$query = "DELETE FROM `user` WHERE ID = " . $id;
		if($this->_conn->query($query) === TRUE){
			$ret = array('data'=>'success');
		}else{
			$ret = array('data'=>'success');
		}
		return json_encode($ret);
	}
}