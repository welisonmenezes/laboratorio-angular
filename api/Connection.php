<?php
class Connection
{
	private $_severname;
	private $_username;
	private $_password;
	private $_dbname;
	private $_conn;

	function __construct($servername, $username, $password, $dbname) {
		$this->_servername = $servername;
		$this->_username = $username;
		$this->_password = $password;
		$this->_dbname = $dbname;

		try{
		    $this->_conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
		    $this->_conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		}catch(PDOException $e){}
	}

	public function getConn(){
		return $this->_conn;
	}
}

$connection = new Connection('localhost', 'root', '', 'angular-estudos');
?>