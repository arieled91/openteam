package com.openteam.application.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.env.Environment
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
class PingController {

    @CrossOrigin("*")
    @RequestMapping("/ping")
    fun ping(): HttpStatus {
        return HttpStatus.OK
    }
}