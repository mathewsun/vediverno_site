<?php
require_once( str_replace('\\', '/', realpath(dirname(__FILE__) . '/') ). '/system/helper/utf8.php');
require_once( str_replace('\\', '/', realpath(dirname(__FILE__) . '/') ). '/system/request.php');
require_once( str_replace('\\', '/', realpath(dirname(__FILE__) . '/') ). '/system/response.php');
require_once( str_replace('\\', '/', realpath(dirname(__FILE__) . '/') ). '/system/db/mpdo.php');
require_once( str_replace('\\', '/', realpath(dirname(__FILE__) . '/') ). '/system/db.php');
require_once( str_replace('\\', '/', realpath(dirname(__FILE__) . '/') ). '/mail.php');
require_once( str_replace('\\', '/', realpath(dirname(__FILE__) . '/') ). '/config.php');
class Send {
    private $error = array();
    private  $request;
    private  $response;

    public function __construct() {
        $this->request = new Request();
        $this->response = new Response();
        $this->response->setCompression('gzip');
        $this->response->addHeader('Content-Type: application/json');
        // $this->db =  new DB(DB_DRIVER, DB_HOSTNAME, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_PORT);
    }   
    public function index(){
            $json = array();
            if (($this->request->server['REQUEST_METHOD'] == 'POST') && $this->validate()) {
               
                $json['success'] = 1;

                $mail = new Mail();

                // $mail->protocol = $this->config->get('config_mail_protocol');
                // $mail->parameter = $this->config->get('config_mail_parameter');
                $subject = 'Заявка с сайта: запрос прайс листа';
                $message = '';

                $message .= '<p>email: '.$this->request->post['email'].'</p>';

                $mail->setTo(EMAIL_TO);
                $mail->setFrom(EMAIL_FROM);
                $mail->setSender(EMAIL_SUBJECT_1);
                $mail->setSubject(html_entity_decode($subject, ENT_QUOTES, 'UTF-8'));
                $mail->setText(strip_tags($message));
                $mail->setHtml($message);
                $mail->send();


            }else{
                $json['error'] = $this->error;
            }

            
            
            $this->response->setOutput(json_encode($json));

            $this->response->output();

       
    }
   
    private function checkPhone($phone){
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "answer WHERE status = '1' AND phone = '" . $this->db->escape($phone) . "'  LIMIT 1"); 
        return $query->row;
    }
    private function validate(){

       
        if ((utf8_strlen($this->request->post['email']) > 96) || !filter_var($this->request->post['email'], FILTER_VALIDATE_EMAIL)) {
			$this->error['email'] = 'Укажите свою почту';;
		}

        return !$this->error;
    }

}

$sendmessage = new Send();
$sendmessage->index();