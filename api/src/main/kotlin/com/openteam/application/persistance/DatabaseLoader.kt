package com.openteam.application.persistance

import com.openteam.application.model.Event
import com.openteam.application.model.Player
import com.openteam.application.repository.EventRepository
import com.openteam.common.Dev
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import java.time.LocalDateTime


@Dev @Component
class DatabaseLoader : CommandLineRunner {

    @Autowired lateinit var eventDao: EventRepository

    @Dev
    override fun run(vararg args: String?) {

        val event = this.eventDao.save(Event("Futbol", LocalDateTime.of(2017, 7, 7, 19, 0)))

        event.teams.get(0).players.add(Player("Ariel", "ariel@gmail.com"))
        event.teams.get(0).players.add(Player("Juan", "juan@hotmail.com"))
        event.teams.get(0).players.add(Player("Carlos", "", true))

        eventDao.save(event)
    }
}
