package com.github.openteam.model

import javax.persistence.*

@Entity
@Table(name = "team")
class Team (

    @ManyToOne
    @JoinColumn(name = "event_id")
    var event: Event,

//    @OneToMany(mappedBy = "team")
//    var players: MutableList<Player>?,

    var name : String = "",


    @Id @GeneratedValue(strategy= GenerationType.AUTO)
    var id : Int = 0
){
    constructor() : this(Event())
}