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

    @OneToMany(cascade = arrayOf(CascadeType.ALL))
    @JoinTable(name = "event_teams", joinColumns = arrayOf(JoinColumn(name = "id")), inverseJoinColumns = arrayOf(JoinColumn(name = "event_id")))
    var teams: MutableList<Team> =  arrayListOf(Team("default")),

    var creationTime : LocalDateTime = LocalDateTime.now(),

    @Id @GeneratedValue(strategy= GenerationType.AUTO)
    private var id: Long = 0

){
    constructor() : this("")
}