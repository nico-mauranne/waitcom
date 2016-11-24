<?php
class Form{

	private $datas =[];

	public function __construct($datas = []){
		$this->datas= $datas;
	}

	private function input($type, $name, $label){
		if($type == 'textarea'){
			$input ="<textarea class=\"form-control\" name=\"$name\" id=\"input$name\" rows=\"4\" required >$value</textarea>";
		}else{
			$input= "<input type=\"$type\" name=\"$name\" class=\"form-control\" id=\"input$name\" placeholder=\"votre nom\" required value=\"$value\">";
		}

		$value="";
		if(isset($this->datas[$name])){
			$value=$this->datas[$name];
		}

		return "<div class=\"form-group\">
			<label for=\"input$name\">$label</label>
			$input
			
		</div>";

	}

	public function text($name, $label){

		return $this->input('text',$name,$label);
	}


	public function email($name, $label){

		return $this->input('email',$name,$label);
	}

	public function textarea($name, $label){

		return $this->input('textarea',$name,$label);
	}
	public function submit ($label){
		return '<button type="submit" class="btn btn-default">'.$label.'</button>';
	}



}