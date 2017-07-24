package com.openteam.model

import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "team")
data class Team (
    var name : String = "",

    @OneToMany(cascade = arrayOf(CascadeType.ALL))
    @JoinTable(name = "team_players", joinColumns = arrayOf(JoinColumn(name = "key")), inverseJoinColumns = arrayOf(JoinColumn(name = "team_id")))
    var players: MutableList<Player> = arrayListOf(),

    var creationTime : LocalDateTime = LocalDateTime.now(),

    @Id @GeneratedValue(strategy= GenerationType.AUTO)
    var id : Long = 0
)