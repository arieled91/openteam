package com.openteam.model

import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "player")
data class Player (
    var name : String = "",
    var email: String = "",
    var guest: Boolean = false,
    var active: Boolean = true,
    var creationTime : LocalDateTime = LocalDateTime.now(),

    @Id @GeneratedValue(strategy= GenerationType.AUTO)
    var id : Long = 0
)