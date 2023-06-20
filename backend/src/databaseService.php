<?php

class DatabaseService {

    public $db;

    public function __construct() {
        $this->db = newAdoConnection('postgres');
        // $this->db->debug = true;
        $this->db->Connect('db', getenv('DB_USER'), getenv('DB_PASSWD'), getenv('DB_NAME'));
    }

    public function getIsConnected() {
        return 'retorno do acesso ao banco - '.($this->db->isConnected()?'conectado':'não conectado');
    }
}