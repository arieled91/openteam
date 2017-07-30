package com.openteam.application.model


import com.fasterxml.jackson.annotation.ObjectIdGenerators
import org.hibernate.id.UUIDGenerator
import org.springframework.format.annotation.DateTimeFormat
import java.time.LocalDateTime
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "event", schema = "openteam")
data class Event(
    var name: String = "",

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    var dateTime: LocalDateTime = LocalDateTime.MIN,

    @OneToMany(cascade = arrayOf(CascadeType.ALL))
    @JoinTable(name = "event_teams", joinColumns = arrayOf(JoinColumn(name = "key")), inverseJoinColumns = arrayOf(JoinColumn(name = "event_id")))
    var teams: MutableList<Team> =  arrayListOf(Team("default")),

    var creationTime : LocalDateTime = LocalDateTime.now(),

    var uuid : String = UUID.randomUUID().toString(),

    @Id @GeneratedValue(strategy= GenerationType.IDENTITY)
    private var id: Long = 0

)