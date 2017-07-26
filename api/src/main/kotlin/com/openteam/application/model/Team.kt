package com.openteam.application.model

import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "team", schema = "openteam")
data class Team (
        var name : String = "",

        @OneToMany(cascade = arrayOf(CascadeType.ALL))
    @JoinTable(name = "team_players", joinColumns = arrayOf(JoinColumn(name = "key")), inverseJoinColumns = arrayOf(JoinColumn(name = "team_id")))
    var players: MutableList<Player> = arrayListOf(),

        var creationTime : LocalDateTime = LocalDateTime.now(),

        @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
    var id : Long = 0
)