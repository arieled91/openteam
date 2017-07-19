package com.github.openteam.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping

@Controller
open class HomeController {

    @RequestMapping(value = "/")
    open fun index(): String {
        return "index"
    }
}