package com.github.openteam.persistance

import com.github.openteam.model.Event
import com.github.openteam.model.Player
import com.github.openteam.repository.EventRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import java.time.LocalDateTime

@Component
class DatabaseLoader : CommandLineRunner {

    @Autowired lateinit var eventDao: EventRepository

    override fun run(vararg args: String?) {

        val event = this.eventDao.save(Event("Futbol", LocalDateTime.of(2017, 7, 7, 19, 0)))

        event.teams.get(0).players.add(Player("Ariel"))
        event.teams.get(0).players.add(Player("Juan"))
        event.teams.get(0).players.add(Player("Carlos"))

        eventDao.save(event)
    }
}