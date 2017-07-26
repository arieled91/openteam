package com.openteam.application.persistance

import com.openteam.application.model.Event
import com.openteam.application.model.Player
import com.openteam.application.repository.EventRepository
import com.openteam.common.NotProduction
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.core.env.Environment
import org.springframework.stereotype.Component
import java.time.LocalDateTime


@NotProduction @Component
class DatabaseLoader : CommandLineRunner {

    @Autowired lateinit var eventDao: EventRepository
//    @Autowired lateinit var environment : Environment

    override fun run(vararg args: String?) {


//        val isDev = this.environment.getActiveProfiles().contains("dev")
//
//        if(isDev) {
//            val event = this.eventDao.save(Event("Futbol", LocalDateTime.of(2017, 7, 7, 19, 0)))
//
//            event.teams.get(0).players.add(Player("Ariel", "ariel@gmail.com"))
//            event.teams.get(0).players.add(Player("Juan", "juan@hotmail.com"))
//            event.teams.get(0).players.add(Player("Carlos", "", true))
//
//            eventDao.save(event)
//        }
    }
}
