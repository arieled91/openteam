package com.github.openteam.model


import org.springframework.format.annotation.DateTimeFormat
import java.time.LocalDateTime
import javax.persistence.*

@Entity
@Table(name = "event")
open class Event(
    var name: String = "",

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    var dateTime: LocalDateTime = LocalDateTime.MIN,

    @OneToMany(mappedBy = "event")
    var teams: MutableList<Team> = arrayListOf(),

    @Id @GeneratedValue(strategy= GenerationType.AUTO)
    private var id: Long = 0

){
    constructor() : this("")
}