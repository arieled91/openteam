package com.openteam.repository

import com.openteam.model.Event
import com.openteam.model.Player
import com.openteam.model.Team
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.repository.query.Param
import org.springframework.data.web.PageableDefault

interface EventRepository : CrudRepository<Event, Long>, PagingAndSortingRepository<Event, Long>


interface PlayerRepository : CrudRepository<Player, Long>, PagingAndSortingRepository<Player, Long>{

    fun findByNameIgnoreCaseContainingOrderByName(@Param("name") name : String, @PageableDefault(30) pageable : Pageable): Page<Player>
}




interface TeamRepository : CrudRepository<Team, Long>, PagingAndSortingRepository<Team, Long>