package com.github.openteam.persistance

import com.github.openteam.model.Event
import com.github.openteam.model.Team
import com.github.openteam.repository.EventRepository
import com.github.openteam.repository.TeamRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import java.time.LocalDateTime

@Component
class DatabaseLoader : CommandLineRunner {

    @Autowired lateinit var eventDao: EventRepository
    @Autowired lateinit var teamDao: TeamRepository

    override fun run(vararg args: String?) {


        val event = this.eventDao.save(Event("Futbol", LocalDateTime.now()))

        this.teamDao.save(Team(event, "A"))


    }
}