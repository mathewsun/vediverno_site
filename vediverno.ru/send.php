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
                $subject = 'Заявка с сайта';
                $message = '';

                $message .= '<p>Имя: '.$this->request->post['Calc-Name'].'</p>';
                $message .= '<p>Email: '.$this->request->post['Calc-Email'].'</p>';
                $message .= '<p>Телефон: '.$this->request->post['Calc-Number'].'</p>';

                $message .= '<p>Количество работников: '.$this->request->post['hmtl_employee'].'</p>';
                $message .= '<p>Количество операций: '.$this->request->post['hmtl_operation'].'</p>';
                $message .= '<p>Налог: '.$this->request->post['hmtl_tax'].'</p>';
                $message .= '<p>Тариф: '.$this->request->post['hmtl_tarif'].'</p>';
                if($this->request->post['hmtl_gos']){
                    $message .= '<p>ГОЗ: включено</p>';
                }

                if($this->request->post['hmtl_free']){
                    $message .= '<p>Бесплатный экспресс-анализ: включено</p>';
                }
                if($this->request->post['hmtl_null']){
                    $message .= '<p>Сдача нулевой отчетности: включено</p>';
                }
                
                $mail->setTo(EMAIL_TO);
                $mail->setFrom(EMAIL_FROM);
                $mail->setSender(EMAIL_SUBJECT_1);
                $mail->setSubject(html_entity_decode($subject, ENT_QUOTES, 'UTF-8'));
               // $mail->setText($message);
                $mail->setHtml($message);
                $mail->send();


            }else{
                $json['error'] = $this->error;
            }

            
            
            $this->response->setOutput(json_encode($json));

            $this->response->output();

       
    }
    private function addVote($data){
        die();
        $this->db->query("INSERT INTO " . DB_PREFIX . "answer SET 
            question_id = '" . (int)$data['qid'] . "', 
            city_id = '" . (int)$data['cid'] . "', 
            phone = '" . $this->db->escape($data['user-phone']) . "',
            status = '1'
        ");
        $q_id = $this->db->getLastId();
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "question WHERE status = '1' AND question_id = '" . (int)$data['qid'] . "'  LIMIT 1"); 
        $question_info = $query->row;

        $score = $question_info['question_score']+1;
        $this->db->query("UPDATE " . DB_PREFIX . "question SET question_score = '" . (int)$score . "' WHERE question_id = '" . (int)$data['qid']. "'");

        return $q_id ;
    }
    private function checkPhone($phone){
        $query = $this->db->query("SELECT * FROM " . DB_PREFIX . "answer WHERE status = '1' AND phone = '" . $this->db->escape($phone) . "'  LIMIT 1"); 
        return $query->row;
    }
    private function validate(){

        if ((utf8_strlen($this->request->post['Calc-Number']) < 10) || (utf8_strlen($this->request->post['Calc-Number']) > 32)) {
			$this->error['Calc-Number'] = 'Укажите свой телефон';
        }
        if ((utf8_strlen($this->request->post['Calc-Email']) > 96) || !filter_var($this->request->post['Calc-Email'], FILTER_VALIDATE_EMAIL)) {
			$this->error['Calc-Email'] = 'Укажите свою почту';;
		}

        return !$this->error;
    }

}

$sendmessage = new Send();
$sendmessage->index();