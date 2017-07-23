package com.openteam.persistance

import com.openteam.model.Event
import com.openteam.model.Player
import com.openteam.repository.EventRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.context.annotation.Profile
import org.springframework.stereotype.Component
import java.time.LocalDateTime

@Component
@Profile("dev")
class DatabaseLoader : CommandLineRunner {

    @Autowired lateinit var eventDao: EventRepository

    override fun run(vararg args: String?) {

        val event = this.eventDao.save(Event("Futbol", LocalDateTime.of(2017, 7, 7, 19, 0)))

        event.teams.get(0).players.add(Player("Ariel", "ariel@gmail.com"))
        event.teams.get(0).players.add(Player("Juan", "juan@hotmail.com"))
        event.teams.get(0).players.add(Player("Carlos", "", true))

        eventDao.save(event)
    }
}