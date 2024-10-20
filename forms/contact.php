<?php
  /**
  * Requires the "PHP Email Form" library
  * The "PHP Email Form" library is available only in the pro version of the template
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  * For more info and help: https://bootstrapmade.com/php-email-form/
  */

  // Receiving email address
  $receiving_email_address = 'info@ranger.lk';

  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    include( $php_email_form );
  } else {
    die( 'Unable to load the "PHP Email Form" Library!');
  }

  $contact = new PHP_Email_Form;
  $contact->ajax = true;
  
  $contact->to = $receiving_email_address;
  $contact->from_name = $_POST['name'];
  $contact->from_email = $_POST['email'];
  $contact->subject = $_POST['subject'];

  // SMTP configuration for info@ranger.lk
  $contact->smtp = array(
    'host' => 'ultra55.lhws.net',  // Replace with your SMTP host if different
    'username' => 'info@ranger.lk',  // Your email address
    'password' => 'Tsa&@Wr7#74Hf',  // Your email password or App Password (recommended for Google Workspace/Gmail)
    'port' => '587',  // TLS port (use 465 for SSL)
    'encryption' => 'tls'  // Encryption type ('tls' for port 587, 'ssl' for port 465)
  );

  // Add the messages that will be sent
  $contact->add_message( $_POST['name'], 'From');
  $contact->add_message( $_POST['email'], 'Email');
  $contact->add_message( $_POST['message'], 'Message', 10);

  echo $contact->send();
?>
