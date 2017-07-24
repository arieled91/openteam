package com.openteam

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication

@SpringBootApplication
open class OpenteamApplication {
    companion object {
        @JvmStatic fun main(args: Array<String>) {
            SpringApplication.run(OpenteamApplication::class.java, *args)
        }
    }
}


//@SpringBootApplication
//open class OpenteamApplication
//
//fun main(args: Array<String>) {
//    SpringApplication.run(OpenteamApplication::class.java, *args)
//}
