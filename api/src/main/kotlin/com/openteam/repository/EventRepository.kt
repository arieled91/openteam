package com.openteam.repository

import com.openteam.model.Event
import com.openteam.model.Player
import com.openteam.model.Team
import org.springframework.data.repository.CrudRepository

interface EventRepository : CrudRepository<Event, Long>//, PagingAndSortingRepository<Event, Long>
interface PlayerRepository : CrudRepository<Player, Long>//, PagingAndSortingRepository<Player, Long>
interface TeamRepository : CrudRepository<Team, Long>//, PagingAndSortingRepository<Team, Long>