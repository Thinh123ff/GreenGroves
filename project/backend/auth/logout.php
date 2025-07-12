<?php
session_start();
session_destroy();
header('Location: /project/index.html');
exit;
