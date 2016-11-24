<?php


require '_inc.php';


$errors = [];

$validator = new Validator($_POST);
$validator->check('name', 'required');
$validator->check('email', 'required');
$validator->check('subject', 'required');
$validator->check('email', 'email');
$validator->check('message', 'required');
$errors = $validator->errors();




if(!empty($errors)){
	$_SESSION['errors']=$errors;
	$_SESSION['inputs']=$_POST;
	header('Location: index.php#contact');
}else{
	$_SESSION['success'] = 1;
	$message = $_POST['message'];
	$subject = $_POST['subject'];
	$headers = $_POST['email'];
	mail('elpapymomo@hotmail.com', $subject, $message, $headers);
	header('Location: index.php#contact');
}



