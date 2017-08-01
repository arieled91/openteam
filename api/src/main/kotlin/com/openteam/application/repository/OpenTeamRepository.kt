package com.openteam.application.repository

import com.openteam.application.model.Event
import com.openteam.application.model.Player
import com.openteam.application.model.Team
import org.springframework.data.domain.Page
import org.springframework.data.domain.Pageable
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.PagingAndSortingRepository
import org.springframework.data.repository.query.Param
import org.springframework.data.rest.core.annotation.RepositoryRestResource
import org.springframework.data.rest.core.config.Projection
import org.springframework.data.web.PageableDefault

interface EventRepository : CrudRepository<Event, Long>, PagingAndSortingRepository<Event, Long>{
    fun findByUuid(@Param("uuid") uuid : String) : Event
    fun findByNameIgnoreCaseContainingOrderByDateTimeDesc(@Param("name") name : String, @PageableDefault(10) pageable : Pageable) : Page<Event>
}


interface PlayerRepository : CrudRepository<Player, Long>, PagingAndSortingRepository<Player, Long>{

    @Query("select p from Player p where upper(p.name) like upper(concat('%', :name,'%')) and p.active = true")
    fun findByNameContaining(@Param("name") name : String, @PageableDefault(30) pageable : Pageable): Page<Player>
}


@RepositoryRestResource(excerptProjection = PlayersInlineProjection::class)
interface TeamRepository : CrudRepository<Team, Long>, PagingAndSortingRepository<Team, Long>


@Projection(name = "inlinePlayers", types = arrayOf(Team::class))
interface PlayersInlineProjection {
    var name : String
    var players: MutableSet<Player>
}