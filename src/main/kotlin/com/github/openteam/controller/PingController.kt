package com.github.openteam.controller

import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
class PingController {

    @CrossOrigin("*")
    @RequestMapping("/ping")
    fun ping(): String {
        return "OK"
    }
}