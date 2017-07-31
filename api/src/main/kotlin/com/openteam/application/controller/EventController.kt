package com.openteam.application.controller

import com.openteam.application.repository.EventRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
open class EventController {

    @Autowired lateinit var eventDao : EventRepository

//    @CrossOrigin("*")
//    @RequestMapping("/events/{}")
//    open fun postEvents() : String
//    {
//
//    }
}