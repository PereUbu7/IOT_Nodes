<?php
class DatabaseConnection
{
	private $dbConnection;
	
	function Connect($fileName)
	{
		// Create a DSN for the database using its filename
		$dsn = "sqlite:$fileName";
			
		// Open the database file and catch the exception if it fails.
		try 
		{
			$this->dbConnection = new PDO($dsn);
			$this->dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			
			$stmt = $this->dbConnection->prepare( "PRAGMA foreign_keys = ON;" );
			$stmt->execute();
		} 
		catch (PDOException $e) 
		{
			echo "Failed to connect to the database using DSN:<br>$dsn<br>";
			throw $e;
		}
	}

	function GetLogsForNode($nodeId, $fromDateTime)
	{
		$stmt = $this->dbConnection->prepare( "SELECT
		dateTime,
		value0,
		value1,
		value2,
		value3,
		value4,
		value5,
		value6,
		value7,
		value8,
		value9
		FROM data
		WHERE node = ?
		AND dateTime > ?;");
		
		$params = [$nodeId, $fromDateTime];
		$stmt->execute($params);

		$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return $res;
	}

	function GetAllNodes()
	{
		$stmt = $this->dbConnection->prepare( "SELECT 
		node, 
		description,
		value0,
		value1,
		value2,
		value3,
		value4,
		value5,
		value6,
		value7,
		value8,
		value9,
		 FROM nodeDescription");
		$stmt->execute();

		$res = $stmt->fetchAll(PDO::FETCH_ASSOC);
		return $res;
	}
}
?>
