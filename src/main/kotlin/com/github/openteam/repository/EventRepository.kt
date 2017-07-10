package com.github.openteam.repository

import com.github.openteam.model.Event
import com.github.openteam.model.Player
import com.github.openteam.model.Team
import org.springframework.data.repository.CrudRepository

interface EventRepository : CrudRepository<Event, Long>
interface PlayerRepository : CrudRepository<Player, Long>
interface TeamRepository : CrudRepository<Team, Long>