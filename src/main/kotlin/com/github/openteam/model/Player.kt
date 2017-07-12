package com.github.openteam.model

import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "player")
data class Player (
    var name : String = "",

    var creationTime : LocalDateTime = LocalDateTime.now(),

    @Id @GeneratedValue(strategy= GenerationType.AUTO)
    var id : Long = 0
)