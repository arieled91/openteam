package com.github.openteam.model

import java.time.LocalDateTime
import javax.persistence.*

//@Entity
//@Table(name = "player")
class Player {
    var name : String = ""

    @ManyToOne
    @JoinColumn(name = "team_id")
    lateinit var event: Team

    var creationTime : LocalDateTime = LocalDateTime.now()

    @Id @GeneratedValue(strategy= GenerationType.AUTO)
    var id : Int = 0
}