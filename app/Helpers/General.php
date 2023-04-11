<?php

    function getBaseUrl()
    {
        return url('/').''.'/';
    }
    function getCsrfToken()
    {
        return csrf_token();
    }
